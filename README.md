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

`locoCli --token <token> --translate <file to get the translation> --locale <locale> --extract <file where you are extracting> --filename <convert the name if you want>`

---

## Command Options

### General

- `--help`: Show help. _(Boolean)_
- `--version`: Show version number. _(Boolean)_
- `--token`: Your API token. _(Required)_
- `--translate`: Path where your translation JSON file is located. _(Required)_
- `--locale`: Provide the locale you want to get. _(Optional)_
- `--extract`: Path where you want to extract the file. _(Required)_
- `--filename`: Provide the name for the extraction file. _(Optional)_
- `--sort`: Sort the locales by name. _(Optional)_
- `--post`: Post the translation to loco. Default: `true`. _(Optional)_
- `--get`: Get the translation from loco. Default: `true`. _(Optional)_
- `--fallback`: Specify a fallback locale to use when a translation is missing. Default: `en`. _(Optional)_

### GET options

- `--filter`: Filter tags to include or exclude in the extraction file.
  - **Include format**: `"tag1" "tag2" "tag3"`
  - **Exclude format**: `"!tag1" "!tag2" "!tag3"`
  - **Example**: `--filter "tag1" "tag2" "tag3"` or `--filter "!tag1" "!tag2" "!tag3"` or `--filter "tag1" "!tag2" "tag3"`
  - _(Optional)_

### POST options

All tag options accept one or more space-separated values.

- `--untagAll`: Remove tags from any assets matched in the imported file.
  - **Example**: `--untagAll "tag1" "tag2" "tag3"`
  - _(Optional)_
- `--tagNew`: Tag any new assets added during import.
  - **Example**: `--tagNew "tag1" "tag2"`
  - _(Optional)_
- `--tagAll`: Tag all assets in the imported file.
  - **Example**: `--tagAll "tag1" "tag2"`
  - _(Optional)_
- `--tagUpdated`: Tag any assets updated during import.
  - **Example**: `--tagUpdated "tag1" "tag2"`
  - _(Optional)_
- `--untagUpdated`: Remove tags from any assets updated during import.
  - **Example**: `--untagUpdated "tag1" "tag2"`
  - _(Optional)_
- `--tagAbsent`: Tag any assets not found in the imported file.
  - **Example**: `--tagAbsent "obsolete" "tag2"`
  - _(Optional)_
- `--untagAbsent`: Remove tags from any assets not found in the imported file.
  - **Example**: `--untagAbsent "tag1" "tag2"`
  - _(Optional)_
- `--deleteAbsent`: Delete any assets not found in the imported file. _(Boolean, Optional)_
- `--ignoreNew`: Skip adding new assets during import. _(Boolean, Optional)_
- `--ignoreBlank`: Skip assets with empty translations during import. _(Boolean, Optional)_
- `--flagNew`: Flag any new assets added during import. _(Optional)_
- `--flagUpdated`: Flag any assets updated during import. _(Optional)_
- `--index`: Specify the key to use as the asset ID: `id` or `text`. _(Optional)_

---

## Examples

**POST only** — upload and untag/tag assets:

```bash
locoCli \
  --token=<my token> \
  --translate ./translate.json \
  --locale en \
  --no-get \
  --extract ./src/assets/i18n \
  --filename en \
  --untagAll 'obsolete' \
  --tagAbsent 'obsolete' 'another-tag'
```

**GET only** — download filtered translations:

```bash
locoCli \
  --token=<my token> \
  --translate ./translate.json \
  --locale en \
  --no-post \
  --extract ./src/assets/i18n \
  --filename en \
  --filter '!obsolete'
```

**POST + GET** — upload then download in one command:

```bash
locoCli \
  --token=<my token> \
  --translate ./translate.json \
  --locale en \
  --extract ./src/assets/i18n \
  --filename en \
  --filter '!obsolete' \
  --untagAll 'obsolete' \
  --tagAbsent 'obsolete'
```

---

You can run the cli just:
`locoCli`

And there will be display of the params that you need to pass
