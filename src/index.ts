#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import { magenta, cyan, green, stripColors } from 'kolorist';
import { prompt } from 'enquirer';

import { write, doesDirExists, isEmpty } from './helpers';

interface Args extends minimist.ParsedArgs {
  template?: string;
}

const argv: Args = minimist(process.argv.slice(2));

/** Templates available */
const TEMPLATES = [
  magenta('express-js'),
  magenta('express-ts'),
  magenta('express-ts-eslint'),
  magenta('express-ts-mongoose'),
];

const targetOptions = {
  appName: '',
  template: '',
};

const init = async () => {
  // Parse Args
  if (argv._.length > 0) {
    targetOptions.appName = argv._[0];
  } else {
    const { name } = await prompt<Promise<{ name: string }>>({
      type: 'input',
      name: 'name',
      message: 'Project name: ',
      initial: 'express-project',
    });
    targetOptions.appName = name;
  }

  // Template validation
  let isValidTemplate = false;
  let messageTemplate = 'Select a template';

  if (argv.template) {
    const availableTempaltes = TEMPLATES.map(stripColors);
    isValidTemplate = availableTempaltes.includes(argv.template);
    messageTemplate = `${argv.template} isn't a valid template. Please choose from below:`;
  }

  if (!argv.template || !isValidTemplate) {
    const { templateName } = await prompt<Promise<{ templateName: string }>>({
      type: 'select',
      name: 'templateName',
      message: messageTemplate,
      choices: TEMPLATES,
    });
    targetOptions.template = stripColors(templateName);
  }

  // Create directory or check if exists and is empty
  const ROOT_PATH = path.join(process.cwd(), targetOptions.appName);
  if (doesDirExists(ROOT_PATH)) {
    if (!isEmpty(ROOT_PATH)) {
      console.log('Dir already exists and is not empty');
      return -1;
    }
  } else {
    fs.mkdirSync(ROOT_PATH, {});
  }
  console.log('Created directory: ', ROOT_PATH);

  // Template path
  const TEMPLATE_PATH = path.resolve(
    __dirname + '/../template-' + targetOptions.template
  );

  // Copy recursive template to user path
  const files = fs.readdirSync(TEMPLATE_PATH);
  for (const file of files.filter(
    (f) => f !== 'package.json' && f !== 'node_modules'
  )) {
    write(file, ROOT_PATH, TEMPLATE_PATH);
  }

  // Check name is valid for package.json
  const pkg = JSON.parse(
    fs.readFileSync(path.join(TEMPLATE_PATH, 'package.json'), 'utf-8')
  );
  pkg.name = path
    .basename(ROOT_PATH)
    .trim()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[~)('!*]+/g, '-');

  fs.writeFileSync(
    path.join(ROOT_PATH, 'package.json'),
    JSON.stringify(pkg, null, 2)
  );

  // Done
  console.log(cyan('\n Done. Now run:\n'));
  console.log(green(` cd ${targetOptions.appName}`));
  console.log(green(' npm install'));
  console.log(green(' npm run dev\n'));
};

init().catch((e) => console.log(e));
