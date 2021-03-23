import fs from 'fs';
import path from 'path';
import minimist from 'minimist';

import { write, doesDirExists, isEmpty } from './helpers';

interface Args extends minimist.ParsedArgs {
  template?: string;
}

const argv: Args = minimist(process.argv.slice(2));

const templates = ['express-ts'];

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
    options.template = 'template-' + argv.template;
  }

  // Create directory or check if exists and is empy
  const ROOT_PATH = path.join(process.cwd(), options.nameApp);
  if (doesDirExists(ROOT_PATH)) {
    if (!isEmpty(ROOT_PATH)) {
      console.log('Dir already exists and is not empty');
    }
  } else {
    fs.mkdirSync(ROOT_PATH, {});
  }
  console.log('Created directory: ', ROOT_PATH);

  // Template path
  if (!templates.includes(options.template)) {
    console.log('Template not supported');
  }
  const TEMPLATE_PATH = path.resolve(__dirname + '/../' + options.template);

  const files = fs.readdirSync(TEMPLATE_PATH);
  for (const file of files.filter(f => f !== 'package.json' && f !== 'node_modules')) {
    write(file, ROOT_PATH, TEMPLATE_PATH);
  }
  console.log('Copy');

  const pkg  = JSON.parse(fs.readFileSync(path.join(TEMPLATE_PATH, 'package.json'), 'utf-8'));
  pkg.name = path
    .basename(ROOT_PATH)
    // #2360 ensure package.json name is valid
    .trim()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[~)('!*]+/g, '-')

  fs.writeFileSync(path.join(ROOT_PATH, 'package.json'), JSON.stringify(pkg, null, 2));
};

init().catch((e) => console.log(e));
