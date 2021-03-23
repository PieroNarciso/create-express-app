import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import { cyan, green } from 'kolorist';

import { write, doesDirExists, isEmpty } from './helpers';

interface Args extends minimist.ParsedArgs {
  template?: string;
}

const argv: Args = minimist(process.argv.slice(2));

const templates = ['express-ts', 'express-ts-eslint'];

const options = {
  nameApp: '',
  template: '',
};

const init = async () => {
  // Parse Args
  if (argv._.length > 0) {
    options.nameApp = argv._[0];
  } else return -1;

  if (argv.template) {
    options.template = argv.template;
  }

  // Create directory or check if exists and is empy
  const ROOT_PATH = path.join(process.cwd(), options.nameApp);
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
  if (!templates.includes(options.template)) {
    console.log('Template not supported');
    return -1;
  }
  const TEMPLATE_PATH = path.resolve(__dirname + '/../template-' + options.template);

  const files = fs.readdirSync(TEMPLATE_PATH);
  for (const file of files.filter(f => f !== 'package.json' && f !== 'node_modules')) {
    write(file, ROOT_PATH, TEMPLATE_PATH);
  }

  const pkg  = JSON.parse(fs.readFileSync(path.join(TEMPLATE_PATH, 'package.json'), 'utf-8'));
  pkg.name = path
    .basename(ROOT_PATH)
    .trim()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[~)('!*]+/g, '-')

  fs.writeFileSync(path.join(ROOT_PATH, 'package.json'), JSON.stringify(pkg, null, 2));

  console.log(cyan('\n Done. Now run:\n'));
  console.log(green(` cd ${options.nameApp}`));
  console.log(green(' npm install'));
  console.log(green(' npm run dev'));
};

init().catch((e) => console.log(e));
