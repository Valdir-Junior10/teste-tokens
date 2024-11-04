import StyleDictionary from "style-dictionary";
import { register } from "@tokens-studio/sd-transforms";
import { brandsNames, getThemeNames, configFile } from "./config.mjs"

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
    console.log('======================================');
    console.log(`Processing: [${themes}] [${brand}]`);

    const brandsThemes = new StyleDictionary(configFile(brand, themes));
    brandsThemes.log.verbose = true;
    brandsThemes.log.errors.brokenReferences = 'throw'; // Trata referências quebradas como erros

    brandsThemes.buildAllPlatforms()
  });
});