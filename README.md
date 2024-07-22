# loco-translate-cli

Is just a cli for translate from loco and add the files you want in the project

---

## Description

This is simple project of CLI that you can pass your json translate files and it will download the files from loco and add it to your project.

## Installation

To install the dependencies of this project, navigate to the project directory and run the following command:

```bash
npm i loco-translate-cli
```

## Usage

The cli expect params:

- `Key of the loco project`
- `path of the json file that you want to upload and get the update one`: `./<path>`
- `language of the json file` : this is corelated with the loco project locale ('en', 'el'...)
- `path where you want to save the file`: `./<path>`
- `name convection of the file (only the name)`: `gr_el` this is optional if you not add we will add the name of the locale

---

### Run the cli

Please use the locoCli --help to display what params you need to pass

`locoCli  --token <token> --translate <file to get the translation> --locale <locale> --extract <file where you are extracting> --filename <convert the name if you want>`

`locoCli <key> <path translation> <language> <path extraction> <name of the file>`

---

## Options

Options:
  --help       Show help                                               [boolean]
  --version    Show version number                                     [boolean]
  --token      Your API token                                [string] [required]
  --translate  Path where your translation json file is      [string] [required]
  --locale     Provide the locale you want to get                       [string]
  --extract    Path where you want to extract the file       [string] [required]
  --filename   Provide the name for the extraction file                 [string]

---

You can run the cli just:
`locoCli`

And there will be display of the params that you need to pass

