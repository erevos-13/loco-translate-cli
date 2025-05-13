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

---

## Command Options

- `--help`: Show help. _(Boolean)_
- `--version`: Show version number. _(Boolean)_
- `--token`: Your API token. _(Required)_
- `--translate`: Path where your translation JSON file is located. _(Required)_
- `--locale`: Provide the locale you want to get. _(Optional)_
- `--extract`: Path where you want to extract the file. _(Required)_
- `--filename`: Provide the name for the extraction file. _(Optional)_
- `--sort`: Sort the locales by name. _(Optional)_
- `--post`: Post the translation to loco. _(Optional)_
- `--get`: Get the translation from loco. _(Optional)_
- `--untagAll`: Remove existing tags from any assets matched in the imported file.
  - **Example**: `--untagAll "tag1" "tag2" "tag3"`
  - _(Optional)_
- `--filter`: Filter tags to include or exclude in the extraction file.
  - **Include format**: `"tag1","tag2","tag3"`
  - **Exclude format**: `"!tag1","!tag2","!tag3"`
  - **Example**: `--filter "tag1" "tag2" "tag3"` or `--filter "!tag1" "!tag2" "!tag3"` or `--filter "tag1" "!tag2" "tag3"`
  - _(Optional)_
- `--fallback`: Specify a fallback locale to use when a translation is missing. (Optional)
  - _(Optional)_

---

You can run the cli just:
`locoCli`

And there will be display of the params that you need to pass
