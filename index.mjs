import chalk from "chalk";
import fs from "fs";
import fetch from "node-fetch";
import readline from "node:readline";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//* API key for Loco
let API_KEY_LOCO = "5vnmqW7NAGTpvvDhYK7lEHYDYPI2_MH0F";
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
const postToEndpoint = async () => {
  try {
    console.group("Posting to endpoint");
    const translationFile = await getTranslationFile("./translationCopy.json");
    const url = `https://localise.biz/api/import/json?key=${API_KEY_LOCO}&locale=en&ignore-existing=true&tag-absent=obsolete&format=JSON`; // `https://localise.biz/api/import/json&locale=en&ignore-existing=true&tag-absent=obsolete&format=JSON&key=5vnmqW7NAGTpvvDhYK7lEHYDYPI2_MH0F`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(flattenObject(translationFile)),
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
    console.log(chalk.white.bgGray("Getting from loco"));
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

const extractZip = async (locale) => {
  try {
    const fileContent = fs.readFileSync(`./${locale}.json`, "utf8");
    writeToFileInNewLocation(
      `./${locale}.json`,
      "./testTarget/i18n",
      fileContent
    );
    console.log("Extraction complete");
  } catch (err) {
    console.error(chalk.white.bgRed("Error on extract file"), err);
  }
};

const copyTranslation = (param) => {
  try {
    const sourcePath = path.resolve(__dirname, param);
    const destinationPath = path.resolve(__dirname, "./translationCopy.json");

    fs.copyFileSync(sourcePath, destinationPath);
  } catch (error) {
    console.log(chalk.redBright("Error file during copy"), error);
  }
};

// Call the function immediately
console.log(
  chalk.blueBright("Process of getting the translations"),
  process.argv
);

const getTheArguments = (paramQuestion) => {
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
};

const getFromUserTheParams = async () => {
  let params = [];
  const questions = [
    "Please provide the API key for Loco: ",
    "Please provide the path to the translation file: ",
    "Please provide the locale that you want to extract: ",
  ];
  for (let index = 0; index < questions.length; index++) {
    const param = await getTheArguments(questions[index]);
    params.push(param);
  }
  console.log(chalk.black.bgCyan("Params: "), params);
  if (params.length === 3) {
    API_KEY_LOCO = "J4XWEeVy_gDH6JriwrqzvCZq4qhS8_hdw"; //params[0];
    // copyTranslation(params[1]);
    copyTranslation("./translation.json");
  } else {
    console.log(chalk.white.bgRed("No selected params"));
  }

  postToEndpoint()
    .then(() => getFromEndpoint(params[2]))
    .then(() => extractZip(params[2]))
    .then(() => {
      console.log(chalk.greenBright("Process completed"));
      fs.unlinkSync(`./${locale}.json`);
    })
    .catch((error) => console.error(error));
};

getFromUserTheParams();

