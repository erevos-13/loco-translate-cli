import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import boxen from 'boxen';

console.log(
  '\n' +
    boxen(
      chalk.green(
        '\n' +
          'Loco CLI Upload and extract' +
          '\n' +
          'Please add the key of your loco project, the json file that we will upload' +
          '\n' +
          'and the locale that you want to extract' +
          '\n' +
          'and the path where you want to extract the file' +
          '\n' +
          'and the name that the translation file is going to get (Default is the locale)' +
          '\n' +
          'This will upload the json file to loco and extract the locale file'
      ),
      {
        padding: 1,
        borderColor: 'green',
        dimBorder: true,
      }
    ) +
    '\n'
);

const parsedArgus = yargs(hideBin(process.argv))
  .option('untagAll', {
    describe: 'Remove existing tags from any assets matched in the imported file',
    type: 'array',
    default: [],
  })
  .option('post', {
    describe: 'Post the translation to loco',
    type: 'boolean',
    default: true,
  })
  .option('get', {
    describe: 'Get the translation from loco',
    type: 'boolean',
    default: true,
  })
  .option('sort', {
    describe: 'Sort the locales by name',
    type: 'string',
    default: 'id',
  })
  .option('token', {
    describe: 'Your API token',
    type: 'string',
  })
  .option('translate', {
    describe: 'Path where your translation json file is',
    type: 'string',
  })
  .option('locale', {
    describe: 'Provide the locale you want to get',
    type: 'string',
    demandOption: false,
    requiresArg: false,
    skipValidation: true,
    default: '',
  })
  .option('extract', {
    describe: 'Path where you want to extract the file',
    type: 'string',
  })
  .option('filename', {
    describe: 'Provide the name for the extraction file',
    type: 'string',
  })
  .option('filter', {
    describe: `Filter tags to include or exclude in the extraction file. 
Include format: "tag1","tag2","tag3". 
Exclude format: "!tag1","!tag2","!tag3". 
Example: --filter "tag1" "tag2" "tag3" or --filter="!tag1" "!tag2" "!tag3"`,
    type: 'array',
    default: [],
    requiresArg: false,
    skipValidation: true,
  })
  .demandOption(['token', 'translate', 'extract'], 'Please provide all required options').argv;

console.log('Token:', chalk.greenBright(parsedArgus.token));
console.log('File translation:', chalk.greenBright(parsedArgus.translate));
console.log('Locale:', chalk.greenBright(parsedArgus.locale));
console.log('Path where want to extract the file:', chalk.greenBright(parsedArgus.extract));
console.log('Name of the file:', chalk.greenBright(parsedArgus.filename));
console.log('Untag all:', chalk.greenBright(parsedArgus.untagAll));
console.log('Post:', chalk.greenBright(parsedArgus.post));
console.log('Get:', chalk.greenBright(parsedArgus.get));

export default parsedArgus;
