import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export class Entities {
  static CURRENT_DIR_PATH = path.dirname(fileURLToPath(import.meta.url));

  static getBrands() {
    const BRANDS_FOLDER_PATH = './figma/brands';

    try {
      return fs
        .readdirSync(path.join(this.CURRENT_DIR_PATH, BRANDS_FOLDER_PATH), {
          withFileTypes: true
        })
        .filter((dirent) => dirent.isDirectory() && dirent.name !== 'patterns')
        .map((dirent) => dirent.name);
    } catch (error) {
      console.error('Error reading folder:', error);
      return [];
    }
  }

  static getThemes(brand) {
    return this.get(brand);
  }

  static getComponents(brand, theme) {
    return this.get(brand, theme, 'components');
  }

  static getSchemes(brand, theme) {
    return this.get(brand, theme, 'schemes');
  }

  static getBreakpoints(brand, theme) {
    return this.get(brand, theme, 'breakpoints');
  }

  static get(brand, theme = null, entity = null) {
    try {
      const BRANDS_FOLDER_PATH = theme
        ? `./figma/brands/${brand}/themes/${theme}/${entity}`
        : `./figma/brands/${brand}/themes`;

      return fs
        .readdirSync(path.join(this.CURRENT_DIR_PATH, BRANDS_FOLDER_PATH), {
          withFileTypes: true
        })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
    } catch (error) {
      console.error('Error reading folder:', error);
      return [];
    }
  }
}
