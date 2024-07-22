import path, { dirname } from "path";
import fs from 'fs'
import chalk from "chalk";
export const getTranslationFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file from disk: ${error}`);
  }
};

export const writeToFileInNewLocation = (filePath, newLocation, content) => {
  const fileName = path.basename(filePath);
  const newPath = path.join(newLocation, fileName);
  fs.writeFileSync(newPath, content, "utf8");
};

export const extractLocale = async (locale, destinationFile, nameOfFile) => {
  try {
    const fileContent = fs.readFileSync(`./${locale}.json`, "utf8");
    writeToFileInNewLocation(
      `./${nameOfFile ? nameOfFile : locale}.json`,
      destinationFile,
      fileContent
    );
    console.log(chalk.greenBright("File extracted"));
  } catch (err) {
    console.error(chalk.white.bgRed("Error on extract file"));
    throw err;
  }
};

export const createAndStoreFile = (locale, destinationFile, content) => {
  try {
    if (!fs.existsSync(destinationFile)) {
      console.log(`${destinationFile} does not exist. ready to create.`);
      fs.mkdirSync(destinationFile, { recursive: true });
      console.log(`${destinationFile} create.`);
    } 
    const newPath = path.join(destinationFile, `${locale}.json`);
    fs.writeFileSync(newPath, content, "utf8");

  } catch (error) {
    console.error(`Error creating file`, JSON.stringify(error, null, 4));
    throw error;
  }
}