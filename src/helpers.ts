import fs from 'fs';
import path from 'path';

/**
 * @param {fs.PathLike} path Path to return if exists or not
 * @returns {boolean} false | true
 */
export const doesDirExists = (path: fs.PathLike): boolean => {
  return fs.existsSync(path);
};

/**
 * @param {fs.PathLike} path Path to return if is empty or not
 * @returns {boolean} false | true
 */
export const isEmpty = (path: fs.PathLike): boolean => {
  return fs.readdirSync(path).length === 0;
};

/**
 * @param {fs.PathLike} path Path to determinate if it exists
 *    or is it empty
 * @returns {boolean} Return true if you can create a directory
 *    or false if not
 */
export const doCreateDir = (path: fs.PathLike): boolean => {
  if (doesDirExists(path)) {
    if (!isEmpty(path)) {
      return false;
    }
  }
  return true;
};

/**
 * @param {string} src Full path from to copy
 * @param {dest} src Full path to copy
 */
export const copy = (src: string, dest: string) => {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}


/**
 * @param {string} srcDir Full path of directory from to copy
 * @param {string} destDir Full path of directory to copy
 */
export const copyDir = (srcDir: string, destDir: string): void => {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
};


export const write = (file: string, root: string, templatePath: string) => {
  const targetPath = file === '_gitignore'
    ? path.join(root, '.gitignore')
    : path.join(root, file);
  copy(path.join(templatePath, file), targetPath);
}
