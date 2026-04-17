import chalk from 'chalk';
import fetch from 'node-fetch';
import { getTranslationFile } from './../file-manager/index.js';
import { URL } from './../utils/constants.js';
export const postToEndpoint = async (fileToSend, token, locale, params = {}) => {
  try {
    const translationFile = await getTranslationFile(fileToSend);
    const merged = { 'ignore-existing': true, format: 'JSON', ...params };
    const extraParams = Object.entries(merged)
      .filter(([, val]) => (Array.isArray(val) ? val.length > 0 : val !== null && val !== undefined && val !== ''))
      .map(([key, val]) => `${key}=${Array.isArray(val) ? val.join(',') : val}`)
      .join('&');
    const url = `${URL}/import/json?key=${token}&locale=${locale}&${extraParams}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(translationFile),
    });
    console.log(chalk.red.bgGray('URL:'), url);
    if (!response.ok) {
      console.error(
        chalk.red.bgWhite('Error during post response is not ok'),
        JSON.stringify(response, null, 4)
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (response.status === 204) {
      console.log(chalk.greenBright('Post completed successfully (No Content)'));
      return { success: true };
    }
    console.log(chalk.greenBright('Post completed'));
    return await response.json();
  } catch (error) {
    console.error(chalk.red.bgWhite('Error during post'), error);
    throw error;
  }
};
