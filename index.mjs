#!/usr/bin/env node

import boxen from "boxen";
import chalk from "chalk";
import fs from "fs";
import fetch from "node-fetch";
import readline from "node:readline";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//* API key for Loco
let API_KEY_LOCO = "";
let locale = "en";

const flattenObject = (obj, prefix = "") => {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + "." : "";
    if (
      typeof obj[k] !== "string" &&
      obj[k] !== null &&
      !Array.isArray(obj[k])
    ) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
};
const getTranslationFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file from disk: ${error}`);
  }
};
const postToEndpoint = async (fileToSend) => {
  try {
    console.group("Posting to endpoint");
    const translationFile = await getTranslationFile(fileToSend);
    const url = `https://localise.biz/api/import/json?key=${API_KEY_LOCO}&locale=en&ignore-existing=true&tag-absent=obsolete&format=JSON`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(translationFile),
    });

    if (!response.ok) {
      console.error(
        chalk.red.bgWhite("Error during post response is not ok"),
        JSON.stringify(response, null, 4)
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.groupEnd();
    return await response.json();
  } catch (error) {
    console.error(
      chalk.red.bgWhite('"Error during post"'),
      JSON.stringify(error, null, 4)
    );
    throw error;
  }
};

const getFromEndpoint = async (locale) => {
  try {
    console.log(
      chalk.white.bgGray("Getting from loco"),
      "Locale:",
      chalk.greenBright.bgBlack(locale)
    );
    const url = `https://localise.biz/api/export/locale/${locale}.json?key=${API_KEY_LOCO}&fallback=en`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Loco ${API_KEY_LOCO}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonTranslation = await response.json();
    fs.writeFileSync(
      `${locale}.json`,
      JSON.stringify(jsonTranslation, null, 2)
    );
    console.log(chalk.white.bgGray("File downloaded"));
  } catch (error) {
    console.error(chalk.red.bgWhite("Error during get from loco"), error);
    throw error;
  }
};

const writeToFileInNewLocation = (filePath, newLocation, content) => {
  const fileName = path.basename(filePath);
  const newPath = path.join(newLocation, fileName);
  fs.writeFileSync(newPath, content, "utf8");
};

const extractLocale = async (locale, destinationFile, nameOfFile) => {
  try {
    const fileContent = fs.readFileSync(`./${locale}.json`, "utf8");
    writeToFileInNewLocation(
      `./${nameOfFile ? nameOfFile : locale}.json`,
      destinationFile,
      fileContent
    );
    console.log("Extraction complete");
  } catch (err) {
    console.error(chalk.white.bgRed("Error on extract file"));
    throw err;
  }
};

const getTheArguments = (paramQuestion) => {
  try {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(paramQuestion, (name) => {
        rl.close();
        resolve(name);
      });
    });
  } catch (error) {
    throw new Error("No Param provided");
  }
};

const getFromUserTheParams = async () => {
  console.log(
    "\n" +
      boxen(
        chalk.green(
          "\n" +
            "Loco CLI Upload and extract" +
            "\n" +
            "Please add the key of your loco project, the json file that we will upload" +
            "\n" +
            "and the locale that you want to extract" +
            "\n" +
            "and the path where you want to extract the file" +
            "\n" +
            "and the name that the translation file is going to get (Default is the locale)" +
            "\n" +
            "This will upload the json file to loco and extract the locale file"
        ),
        {
          padding: 1,
          borderColor: "green",
          dimBorder: true,
        }
      ) +
      "\n"
  );
  try {
    let params = process.argv.slice(2);
    if (params.length < 4) {
      params = [];
      const questions = [
        "Please provide the API key for Loco: ",
        "Please provide the path where is going to get the translation \nand send to loco(file must be a json): ",
        "Please provide the locale that you want to get: ",
        "Please provide the path where is going to extract the translation file: ",
        "Please provide the name that the extraction file you want to get (Default is the locale you add previous): ",
      ];
      for (let index = 0; index < questions.length; index++) {
        const param = await getTheArguments(questions[index]);
        const trimmedParam = param.trim();
        if (index === 4 && (!trimmedParam || trimmedParam === "")) {
          continue;
        }
        if (!trimmedParam || trimmedParam.length === 0 || trimmedParam === "") {
          return console.log(chalk.white.bgRed("No selected params"));
        }
        params.push(param);
      }
    }
    console.log(chalk.black.bgCyan("Params: "), params);
    if (params.length > 4) {
      API_KEY_LOCO = params[0];
    } else {
      console.log(chalk.white.bgRed("No Key is past"));
    }

    postToEndpoint(params[1])
      .then(() => getFromEndpoint(params[2]))
      .then(() => extractLocale(params[2], params[3], params[4]))
      .then(() => {
        console.log(chalk.greenBright("Process completed"));
        fs.unlinkSync(`./${params[2]}.json`);
      })
      .catch((error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
};

getFromUserTheParams();

