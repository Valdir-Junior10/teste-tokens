import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import {
  configFileBrand,
  configFileBreakpoint,
  configFileComps,
  configFileScheme
} from './config-files.js';
import {
  brandsNames,
  getBreakpointNames,
  getCompsNames,
  getSchemeNames,
  getThemeNames
} from './config-get-names.js';

register(StyleDictionary);

const Global = new StyleDictionary({
  source: ['figma/Global_base/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          filter: (token) =>
            token.filePath.includes(`figma/Global_base/Foundation.json`),
          destination: 'global.css',
          format: 'css/variables'
        }
      ]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/scss/',
      files: [
        {
          filter: (token) =>
            token.filePath.includes(`figma/Global_base/Foundation.json`),
          destination: 'global.scss',
          format: 'scss/variables'
        }
      ]
    }
  },
  log: {
    warnings: 'warn', // 'warn' | 'error' | 'disabled'
    verbosity: 'verbose', // 'default' | 'silent' | 'verbose'
    errors: {
      brokenReferences: 'throw' // 'throw' | 'console'
    }
  }
});

await Global.buildAllPlatforms();

// Compila tokens de Brand
brandsNames.forEach(function (brand) {
  console.log('======================================');
  console.log(`Processing: [${brand}]`);

  const brands = new StyleDictionary(configFileBrand(brand));
  brands.log.verbose = true;
  brands.log.errors.brokenReferences = 'throw'; // Trata referências quebradas como erros

  brands.buildAllPlatforms();
});

// Compila tokens de Comps
brandsNames.forEach(function (brand) {
  const themesNames = getThemeNames('.', brand);
  themesNames.forEach(function (themes) {
    const comps = getCompsNames('.', brand, themes);
    comps.forEach(function (comps) {
      console.log('======================================');
      console.log(`Processing: [${brand}] [${themes}] [${comps}]`);

      const brandsComps = new StyleDictionary(
        configFileComps(brand, themes, comps)
      );
      brandsComps.log.verbose = true;
      brandsComps.log.errors.brokenReferences = 'throw'; // Trata referências quebradas como erros

      brandsComps.buildAllPlatforms();
    });
  });
});

// Compila tokens de Scheme
brandsNames.forEach(function (brand) {
  const themesNames = getThemeNames('.', brand);
  themesNames.forEach(function (themes) {
    const schemes = getSchemeNames('.', brand, themes);
    schemes.forEach(function (scheme) {
      console.log('======================================');
      console.log(`Processing: [${brand}] [${themes}] [${scheme}]`);

      const brandsSchemes = new StyleDictionary(
        configFileScheme(brand, themes, scheme)
      );
      brandsSchemes.log.verbose = true;
      brandsSchemes.log.errors.brokenReferences = 'throw'; // Trata referências quebradas como erros

      brandsSchemes.buildAllPlatforms();
    });
  });
});

// Compila tokens de Breakpoint
brandsNames.forEach(function (brand) {
  const themesNames = getThemeNames('.', brand);
  themesNames.forEach(function (themes) {
    const breakpoints = getBreakpointNames('.', brand, themes);
    breakpoints.forEach(function (breakpoint) {
      console.log('======================================');
      console.log(`Processing: [${brand}] [${themes}] [${breakpoint}]`);

      const brandsBreakpoint = new StyleDictionary(
        configFileBreakpoint(brand, themes, breakpoint)
      );
      brandsBreakpoint.log.verbose = true;
      brandsBreakpoint.log.errors.brokenReferences = 'throw'; // Trata referências quebradas como erros

      brandsBreakpoint.buildAllPlatforms();
    });
  });
});
