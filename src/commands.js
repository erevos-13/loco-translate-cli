import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import chalk from "chalk";
import boxen from "boxen";
import {TOKEN} from "./utils/constants.js";
let token = TOKEN;

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


const parsedArgus = yargs(hideBin(process.argv))
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
    skipValidation: true
  })
  .option('extract', {
    describe: 'Path where you want to extract the file',
    type: 'string',
  })
  .option('filename', {
    describe: 'Provide the name for the extraction file',
    type: 'string',
  })
  .demandOption(['token', 'translate', 'extract'], 'Please provide all required options').argv 

console.log('Token:', parsedArgus.token);
console.log('File translation:', parsedArgus.translate);
console.log('Locale:', parsedArgus.locale);
console.log('Path where want to extract the file:', parsedArgus.extract);
console.log('Name of the file:', parsedArgus.filename);

export default parsedArgus 