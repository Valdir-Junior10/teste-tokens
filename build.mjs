import StyleDictionary from "style-dictionary";
import { register } from "@tokens-studio/sd-transforms";
import { brandsNames, getThemeNames, getSchemeNames, getBreakpointNames, configFile } from "./config.mjs"

register(StyleDictionary);

const Global = new StyleDictionary({
  source: [
    'figma/Global_base/*.json',
  ],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "dist/css/",
      files: [
        {
          filter: (token) => token.filePath.includes(`figma/Global_base/Foundation.json`),
          destination: "global.css",
          format: "css/variables",
        }
      ],
    },
    scss: {
      transformGroup: "scss",
      buildPath: "dist/scss/",
      files: [
        {
          filter: (token) => token.filePath.includes(`figma/Global_base/Foundation.json`),
          destination: "global.scss",
          format: "scss/variables",
        }
      ],
    }
  },
})

await Global.buildAllPlatforms();

brandsNames.forEach(function (brand) {
  const themesNames = getThemeNames(".", brand);
  themesNames.forEach(function (themes) {
    const schemes = getSchemeNames(".", brand, themes);
    schemes.forEach(function (scheme) {
      const breakpoints = getBreakpointNames(".", brand, themes);
      breakpoints.forEach(function (breakpoint) {
        console.log('======================================');
        console.log(`Processing: [${brand}] [${themes}] [${scheme}] [${breakpoint}]`);

        const brandsThemes = new StyleDictionary(configFile(brand, themes, scheme, breakpoint));
        brandsThemes.log.verbose = true;
        brandsThemes.log.errors.brokenReferences = 'throw'; // Trata referências quebradas como erros

        brandsThemes.buildAllPlatforms();
      });
    });
  });
});