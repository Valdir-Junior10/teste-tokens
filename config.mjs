import fs from "fs";
import _ from "lodash";
import path from "path";
import { fileURLToPath } from "url";

// Mapeia todas as pastas de primeiro nivel em Brands, com exceção de  Patterns

function getBrandsNames(rootFolderPath) {
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDirPath = path.dirname(currentFilePath);
  const brandsFolderPath = "./figma/Brands";

  try {
    // Filtro para incluir apenas diretórios que não se chamam Patterns
    const subFolders = fs.readdirSync(path.join(currentDirPath, brandsFolderPath), {withFileTypes: true}).filter((dirent) => dirent.isDirectory() && dirent.name !== "Patterns");

    // Mapeia os nomes dos diretórios
    const subFolderNames = subFolders.map((dirent) => dirent.name);
    return subFolderNames;
  }
  catch(error) {
    console.error("Error reading folder:", error);
    return [];
  }
}

const brandsNames = getBrandsNames(".");
console.log("Marcas:", brandsNames);

// Mapeia temas que existem dentro da pasta Themes de cada produto
function getThemeNames(rootFolderPath, brand) {
  try {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirectoryPath = path.dirname(currentFilePath);
    const brandsFolderPath = `./figma/Brands/${brand}/Themes`;

    const folderNames = fs.readdirSync(path.join(currentDirectoryPath, brandsFolderPath), {withFileTypes: true}).filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);

    return folderNames
  }
  catch(error) {
    console.error("Error reading folder:", error);
    return [];
  }
}

// Configuração dos arquivos de tokens que serão gerados pelo builder

function configFile(brand, themes) {
  if (!brand) {
    console.error("Brand not defined");
    return;
  }

  const brandThemePath = `figma/Brands/${brand}/Themes/${themes}`;

  const selector = `html${
    themes === "Dark" ? "[data-theme='dark']" : ":root, html[data-theme='light']"
  }`;

  return {
    source: [
      `figma/Global_base/*.json`,
      `figma/Brands/${brand}/Base/*.json`,
      `${brandThemePath}/*.json`,
      `figma/Brands/Patterns/*.json`,
    ],
    platforms: {
      // css
      css: {
        buildPath: `dist/css/`,
        transformGroup: "tokens-studio",
        transforms: ["name/kebab"],
        files: [
          {
            filter: (token) => 
              token.filePath.includes(`figma/Global_base/Foundation.json`) ||
              token.filePath.includes(`${brandThemePath}/Spacing.json`),
            destination: `${brand.toLowerCase()}/${themes.toLowerCase()}.css`,
            format: "css/variables",
            options: {
              selector: selector
            }
          }
        ],
      },
      scss: {
        buildPath: `dist/scss/`,
        transformGroup: "tokens-studio",
        transforms: ["name/kebab"],
        files: [
          {
            filter: (token) => 
              token.filePath.includes(`figma/Global_base/Foundation.json`) ||
              token.filePath.includes(`${brandThemePath}/Spacing.json`),
            destination: `${brand.toLowerCase()}/${themes.toLowerCase()}.scss`,
            format: "scss/variables",
            options: {
              selector: selector
            }
          }
        ],
      }
    }
  }
}

export { brandsNames, getThemeNames, configFile }