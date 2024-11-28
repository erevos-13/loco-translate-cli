import fetch from 'node-fetch';
import chalk from 'chalk';
import fs from 'fs';
import { URL } from './../utils/constants.js';
export const getFromEndpoint = async (locale, token, filter) => {
  try {
    console.log(
      chalk.white.green('Getting from loco'),
      'Locale:',
      chalk.greenBright.green(locale),
      'Filter:',
      chalk.greenBright.green(filter)
    );

    const filterParam = filter && filter.length > 0 ? `&filter=${filter.join(',')}` : '';
    const url = `${URL}/export/locale/${locale}.json?key=${token}&fallback=en${filterParam}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Loco ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonTranslation = await response.json();
    fs.writeFileSync(`${locale}.json`, JSON.stringify(jsonTranslation, null, 2));
    console.log(chalk.white.bgGray('File downloaded'));
  } catch (error) {
    console.error(chalk.red.bgWhite('Error during get from loco'), error);
    throw error;
  }
};

export const getAllTranslation = async token => {
  try {
    const allTranslation = await fetch(
      `${URL}/export/all.json?fallback=en&no-folding=true&key=${token}`
    ).then(res => res.json());
    if (!allTranslation) {
      throw new Error('Error getting all translation');
    }
    if (allTranslation.ok) {
      return await allTranslation.json();
    }
    return allTranslation;
  } catch (error) {
    console.error(`Error getting all translation: ${error}`);
    throw new Error('Error getting all translation');
  }
};
