import { postToEndpoint } from './api/post-translate.js';
import { getAllTranslation, getFromEndpoint } from './api/get-translation.js';
import chalk from 'chalk';
import cmdArgs from './commands.js';
import { extractLocale, createAndStoreFile } from './file-manager/index.js';
import fs from 'fs';

export const server = async () => {
  try {
    const postTranslation = await postToEndpoint(cmdArgs.translate, cmdArgs.token);
    if (!postTranslation) {
      throw new Error('Error posting translation');
    }
    if (cmdArgs.locale) {
      await getFromEndpoint(cmdArgs.locale, cmdArgs.token, cmdArgs.filter);
      extractLocale(cmdArgs.locale, cmdArgs.extract, cmdArgs.filename);
      console.log(chalk.green('Process completed'));
      fs.unlinkSync(`./${cmdArgs.locale}.json`);
    } else {
      const allTranslation = await getAllTranslation(cmdArgs.token);
      Object.keys(allTranslation).forEach(locale => {
        createAndStoreFile(locale, cmdArgs.extract, allTranslation[locale]);
      });
    }
  } catch (error) {
    throw new Error('Error message:', error);
  }
};
