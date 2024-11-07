import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { ConfigFile } from './config-files.js';
import { Entities } from './entities.js';

register(StyleDictionary);

StyleDictionary.registerTransform({
  name: 'value/shadow-css',
  type: 'value',
  transform: (token) => {
    if (Array.isArray(token.value) && token.type === 'boxShadow') {
      return token.value
        .map((shadow) =>
          `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
        )
        .join(', ');
    } else {
      return token.value;
    }
  },
});

class Build {
  static BRAND_NAMES = Entities.getBrands();

  static async execute() {
    await this.compileGlobal();
    await this.compileBrands();
    await this.compileComponents();
    await this.compileSchemes();
    await this.compileBreakpoints();
  }

  static async compileGlobal() {
    const global = new StyleDictionary({
      source: ['figma/global-base/*.json'],
      platforms: {
        css: {
          transformGroup: 'css',
          transforms: ['value/shadow-css'],
          buildPath: 'dist/css/',
          files: [
            {
              filter: (token) =>
                token.filePath.includes(`figma/global-base/foundation.json`),
              destination: 'global.css',
              format: 'css/variables',
            }
          ]
        },
        scss: {
          transformGroup: 'scss',
          transforms: ['value/shadow-css'],
          buildPath: 'dist/scss/',
          files: [
            {
              filter: (token) =>
                token.filePath.includes(`figma/global-base/foundation.json`),
              destination: 'global.scss',
              format: 'scss/variables',
            }
          ]
        }
      }
    });

    return global.buildAllPlatforms();
  }

  static async compileBrands() {
    const brandPromises = this.BRAND_NAMES.map((brand) => {
      console.log('======================================');
      console.log(`Processing: [${brand}]`);

      const brandSD = new StyleDictionary(ConfigFile.brand(brand));

      return brandSD.buildAllPlatforms();
    });

    return Promise.all(brandPromises);
  }

  static async compileComponents() {
    const componentPromises = [];

    this.BRAND_NAMES.forEach((brand) => {
      Entities.getThemes(brand).forEach((theme) => {
        Entities.getComponents(brand, theme).forEach((component) => {
          console.log('======================================');
          console.log(`Processing: [${brand}] [${theme}] [${component}]`);

          const componentSD = new StyleDictionary(
            ConfigFile.component(brand, theme, component)
          );

          componentPromises.push(componentSD.buildAllPlatforms());
        });
      });
    });

    return Promise.all(componentPromises);
  }

  static async compileSchemes() {
    const schemePromises = [];

    this.BRAND_NAMES.forEach((brand) => {
      Entities.getThemes(brand).forEach((theme) => {
        Entities.getSchemes(brand, theme).forEach((scheme) => {
          console.log('======================================');
          console.log(`Processing: [${brand}] [${theme}] [${scheme}]`);

          const schemeSD = new StyleDictionary(
            ConfigFile.scheme(brand, theme, scheme)
          );

          schemePromises.push(schemeSD.buildAllPlatforms());
        });
      });
    });

    return Promise.all(schemePromises);
  }

  static async compileBreakpoints() {
    const breakpointPromises = [];

    this.BRAND_NAMES.forEach((brand) => {
      Entities.getThemes(brand).forEach((theme) => {
        Entities.getBreakpoints(brand, theme).forEach((breakpoint) => {
          console.log('======================================');
          console.log(`Processing: [${brand}] [${theme}] [${breakpoint}]`);

          const breakpointSD = new StyleDictionary(
            ConfigFile.breakpoint(brand, theme, breakpoint)
          );

          breakpointPromises.push(breakpointSD.buildAllPlatforms());
        });
      });
    });

    return Promise.all(breakpointPromises);
  }
}

Build.execute();
