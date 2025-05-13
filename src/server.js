import chalk from 'chalk';
import fs from 'fs';
import { getAllTranslation, getFromEndpoint } from './api/get-translation.js';
import { postToEndpoint } from './api/post-translate.js';
import cmdArgs from './commands.js';
import { createAndStoreFile, extractLocale } from './file-manager/index.js';

export const server = async () => {
  try {
    if (cmdArgs.post) {
      const postTranslation = await postToEndpoint(
        cmdArgs.translate,
        cmdArgs.token,
        cmdArgs.untagAll,
        cmdArgs.locale
      );
      if (!postTranslation) {
        throw new Error('Error posting translation');
      }
    }
    if (cmdArgs.get) {
      await getFromEndpoint(
        cmdArgs.locale,
        cmdArgs.token,
        cmdArgs.filter,
        cmdArgs.sort,
        cmdArgs.fallback
      );
      if (cmdArgs.locale) {
        await extractLocale(cmdArgs.locale, cmdArgs.extract, cmdArgs.filename);
        fs.unlinkSync(`./${cmdArgs.locale}.json`);
      } else {
        const allTranslation = await getAllTranslation(
          cmdArgs.token,
          cmdArgs.filter,
          cmdArgs.fallback
        );
        Object.keys(allTranslation).forEach(locale => {
          createAndStoreFile(locale, cmdArgs.extract, allTranslation[locale]);
        });
      }
    }
    console.log(chalk.green('Process completed'));
  } catch (error) {
    throw new Error(`Error message: ${error}`);
  }
};
