import fetch from "node-fetch";
import {URL} from './../utils/constants.js'
import chalk from "chalk";
import {getTranslationFile} from "./../file-manager/index.js";
export const postToEndpoint = async (fileToSend, token) => {
  try {
    const translationFile = await getTranslationFile(fileToSend);
    const url = `${URL}/import/json?key=${token}&locale=en&ignore-existing=true&tag-absent=obsolete&format=JSON`;
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
    console.log(chalk.greenBright("Post completed"));
    return await response.json();
  } catch (error) {
    console.error(
      chalk.red.bgWhite('Error during post'),
      JSON.stringify(error, null, 4)
    );
    throw error;
  }
};