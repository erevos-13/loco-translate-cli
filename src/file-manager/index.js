import path, { dirname } from 'path';
import fs from 'node:fs/promises';
import fsync from 'node:fs';
import chalk from 'chalk';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { Readable } from 'stream';
export const getTranslationFile = async filePath => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file from disk: ${error}`);
  }
};

export const writeToFileInNewLocation = async (filePath, newLocation, content) => {
  try {
    const fileName = path.basename(filePath);
    const newPath = path.join(newLocation, fileName);
    await fs.writeFile(newPath, content, 'utf8');
  } catch (error) {
    console.error(`Error writing file to disk: ${error}`);
    throw error;
  }
};

export const extractLocale = async (locale, destinationFile, nameOfFile) => {
  try {
    const fileContent = await fs.readFile(`./${locale}.json`, 'utf8');
    await writeToFileInNewLocation(
      `./${nameOfFile ? nameOfFile : locale}.json`,
      destinationFile,
      fileContent
    );
    console.log(chalk.greenBright('File extracted'));
  } catch (err) {
    console.error(chalk.white.bgRed('Error on extract file'));
    throw err;
  }
};

export const createAndStoreFile = async (locale, destinationFile, content) => {
  try {
    if (!fsync.existsSync(destinationFile)) {
      console.log(`${destinationFile} does not exist. ready to create.`);
      fs.mkdirSync(destinationFile, { recursive: true });
      console.log(`${destinationFile} create.`);
    }
    const newPath = path.join(destinationFile, `${locale}.json`);
    const readableStream = Readable.from([JSON.stringify(content)]); // No need for Buffer.from here

    await pipeline(readableStream, createWriteStream(newPath));
  } catch (error) {
    console.error(`Error creating file`, JSON.stringify(error, null, 4));
    throw error;
  }
};
