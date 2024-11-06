import fs from "fs";
import _ from "lodash";
import path from "path";
import { fileURLToPath } from "url";

// Mapeia todas as pastas de primeiro nivel em Brands, com exceção de  Patterns para definir os produtos existentes (ex: Medme e Medsoft)

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

// Mapeia temas que existem dentro da pasta Themes de cada produto (ex: Default e Billy)
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

// Mapeia Schemes que existem dentro da pasta de cada tema de cada produto (ex: Light e Dark)
function getSchemeNames(rootFolderPath, brand, themes) {
  try {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirectoryPath = path.dirname(currentFilePath);
    const brandsFolderPath = `./figma/Brands/${brand}/Themes/${themes}/Schemes`;

    const folderNames = fs.readdirSync(path.join(currentDirectoryPath, brandsFolderPath), {withFileTypes: true}).filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);

    return folderNames
  }
  catch(error) {
    console.error("Error reading folder:", error);
    return [];
  }
}

// Mapeia Breakpoints que existem dentro da pasta de cada tema de cada produto (ex: 360px e 1200px)
function getBreakpointNames(rootFolderPath, brand, themes) {
  try {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirectoryPath = path.dirname(currentFilePath);
    const brandsFolderPath = `./figma/Brands/${brand}/Themes/${themes}/Breakpoint`;

    const folderNames = fs.readdirSync(path.join(currentDirectoryPath, brandsFolderPath), {withFileTypes: true}).filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);

    return folderNames
  }
  catch(error) {
    console.error("Error reading folder:", error);
    return [];
  }
}

// Configuração dos arquivos de tokens que serão gerados pelo builder
function configFile(brand, themes, schemes, breakpoints) {
  if (!brand) {
    console.error("Brand not defined");
    return;
  }

  // const brandThemePath = `figma/Brands/${brand}/Themes/${themes}`;
  const brandSchemePath = `figma/Brands/${brand}/Themes/${themes}/Schemes/${schemes}`;
  const brandBreakpointPath = `figma/Brands/${brand}/Themes/${themes}/Breakpoint/${breakpoints}`;

  // const selector = `html${
  //   themes === "Dark" ? "[data-theme='dark']" : ":root, html[data-theme='light']"
  // }`;

  // const selector = `html[data-theme='${themes.toLowerCase()}']`;

  const selector = `.theme-${themes.toLowerCase()} .scheme-${schemes.toLowerCase()} .breakpoint-${breakpoints.toLowerCase()}`;

  return {
    source: [
      `figma/Global_base/*.json`,
      `figma/Brands/${brand}/*.json`,
      `figma/Brands/${brand}/Themes/${themes}/Comps/*.json`,
      `${brandSchemePath}/*.json`,
      `${brandBreakpointPath}/*.json`,
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
            // filter: (token) => 
            //   token.filePath.includes(`figma/Brands/${brand}/*.json`) ||
            //   token.filePath.includes(`figma/Brands/${brand}/Themes/${themes}/Comps/*.json`) ||
            //   token.filePath.includes(`${brandSchemePath}/*.json`) ||
            //   token.filePath.includes(`${brandBreakpointPath}/*.json`),
            destination: `${brand.toLowerCase()}/${themes.toLowerCase()}-${schemes.toLowerCase()}-${breakpoints}.css`,
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
            // filter: (token) => 
            //   token.filePath.includes(`figma/Brands/${brand}/*.json`) ||
            //   token.filePath.includes(`figma/Brands/${brand}/Themes/${themes}/Comps/*.json`) ||
            //   token.filePath.includes(`${brandSchemePath}/*.json`) ||
            //   token.filePath.includes(`${brandBreakpointPath}/*.json`),
            destination: `${brand.toLowerCase()}/${themes.toLowerCase()}-${schemes.toLowerCase()}-${breakpoints}.css`,
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

export { brandsNames, getThemeNames, getSchemeNames, getBreakpointNames, configFile }