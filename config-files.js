// Configuração dos arquivos de tokens que serão gerados pelo builder
function configFileBrand(brand) {
  if (!brand) {
    console.error('Brand not defined');
    return;
  }

  const selector = `.${brand.toLowerCase()}`;

  return {
    source: [
      `figma/Global_base/*.json`,
      `figma/Brands/${brand}/*.json`,
      `figma/Brands/Patterns/*.json`
    ],
    platforms: {
      css: {
        buildPath: `dist/css/`,
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        files: [
          {
            filter: (token) =>
              token.filePath.includes(`figma/Brands/${brand}/Base.json`),
            destination: `${brand.toLowerCase()}/base.css`,
            format: 'css/variables',
            options: {
              selector: selector
            }
          }
        ]
      },
      scss: {
        buildPath: `dist/scss/`,
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        files: [
          {
            filter: (token) =>
              token.filePath.includes(`figma/Brands/${brand}/Base.json`),
            destination: `${brand.toLowerCase()}/base.css`,
            format: 'scss/variables',
            options: {
              selector: selector
            }
          }
        ]
      }
    }
  };
}

function configFileScheme(brand, theme, scheme) {
  if (!brand) {
    console.error('Brand not defined');
    return;
  }

  const brandSchemePath = `figma/Brands/${brand}/Themes/${theme}/Schemes/${scheme}`;

  const selector = `.${brand.toLowerCase()} .theme-${theme.toLowerCase()} .scheme-${scheme.toLowerCase()}`;

  return {
    source: [
      `figma/Global_base/*.json`,
      `figma/Brands/${brand}/*.json`,
      `${brandSchemePath}/*.json`,
      `figma/Brands/Patterns/*.json`
    ],
    platforms: {
      css: {
        buildPath: `dist/css/`,
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        files: [
          {
            filter: (token) =>
              token.filePath.includes(`${brandSchemePath}/Base.json`),
            destination: `${brand.toLowerCase()}/themes/${theme.toLowerCase()}/scheme/${scheme.toLowerCase()}/base.css`,
            format: 'css/variables',
            options: {
              selector: selector
            }
          }
        ]
      },
      scss: {
        buildPath: `dist/scss/`,
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        files: [
          {
            filter: (token) =>
              token.filePath.includes(`${brandSchemePath}/Base.json`),
            destination: `${brand.toLowerCase()}/themes/${theme.toLowerCase()}/scheme/${scheme.toLowerCase()}/base.css`,
            format: 'scss/variables',
            options: {
              selector: selector
            }
          }
        ]
      }
    }
  };
}

function configFileBreakpoint(brand, theme, breakpoint) {
  if (!brand) {
    console.error('Brand not defined');
    return;
  }

  const brandBreakpointPath = `figma/Brands/${brand}/Themes/${theme}/Breakpoint/${breakpoint}`;

  const selector = `.${brand.toLowerCase()} .theme-${theme.toLowerCase()} .breakpoint-${breakpoint.toLowerCase()}`;

  return {
    source: [
      `figma/Global_base/*.json`,
      `figma/Brands/${brand}/*.json`,
      `${brandBreakpointPath}/*.json`,
      `figma/Brands/Patterns/*.json`
    ],
    platforms: {
      css: {
        buildPath: `dist/css/`,
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        files: [
          {
            filter: (token) =>
              token.filePath.includes(`${brandBreakpointPath}/Base.json`),
            destination: `${brand.toLowerCase()}/themes/${theme.toLowerCase()}/breakpoint/${breakpoint.toLowerCase()}/base.css`,
            format: 'css/variables',
            options: {
              selector: selector
            }
          }
        ]
      },
      scss: {
        buildPath: `dist/scss/`,
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        files: [
          {
            filter: (token) =>
              token.filePath.includes(`${brandBreakpointPath}/Base.json`),
            destination: `${brand.toLowerCase()}/themes/${theme.toLowerCase()}/breakpoint/${breakpoint.toLowerCase()}/base.css`,
            format: 'scss/variables',
            options: {
              selector: selector
            }
          }
        ]
      }
    }
  };
}

function configFileComps(brand, theme, comps) {
  if (!brand) {
    console.error('Brand not defined');
    return;
  }

  const brandCompsPath = `figma/Brands/${brand}/Themes/${theme}/Comps/${comps}`;

  const selector = `.${brand.toLowerCase()} .theme-${theme.toLowerCase()}`;

  return {
    source: [
      `figma/Global_base/*.json`,
      `figma/Brands/${brand}/*.json`,
      `${brandCompsPath}/*.json`,
      `figma/Brands/Patterns/*.json`
    ],
    platforms: {
      css: {
        buildPath: `dist/css/`,
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        files: [
          {
            filter: (token) =>
              token.filePath.includes(`${brandCompsPath}/${comps}.json`),
            destination: `${brand.toLowerCase()}/themes/${theme.toLowerCase()}/comps/base.css`,
            format: 'css/variables',
            options: {
              selector: selector
            }
          }
        ]
      },
      scss: {
        buildPath: `dist/scss/`,
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        files: [
          {
            filter: (token) =>
              token.filePath.includes(`${brandCompsPath}/${comps}.json`),
            destination: `${brand.toLowerCase()}/themes/${theme.toLowerCase()}/comps/base.css`,
            format: 'scss/variables',
            options: {
              selector: selector
            }
          }
        ]
      }
    }
  };
}

export {
  configFileBrand,
  configFileBreakpoint,
  configFileComps,
  configFileScheme
};
