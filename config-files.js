// Configuração dos arquivos de tokens que serão gerados pelo builder
export class ConfigFile {
  static brand(brand) {
    if (!brand) {
      console.error('Brand not defined');
      return;
    }

    const selector = `.${brand.toLowerCase()}`;

    return {
      source: [
        `figma/global-base/*.json`,
        `figma/brands/${brand}/*.json`,
        `figma/brands/patterns/*.json`
      ],
      platforms: {
        css: {
          buildPath: `dist/css/`,
          transformGroup: 'tokens-studio',
          transforms: ['name/kebab'],
          files: [
            {
              filter: (token) =>
                token.filePath.includes(`figma/brands/${brand}/base.json`),
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
                token.filePath.includes(`figma/brands/${brand}/base.json`),
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

  static scheme(brand, theme, scheme) {
    return this.get(brand, theme, 'schemes', scheme);
  }

  static breakpoint(brand, theme, breakpoint) {
    return this.get(brand, theme, 'breakpoints', breakpoint);
  }

  static component(brand, theme, component) {
    return this.get(brand, theme, 'components', component);
  }

  static get(brand, theme, entityType, entityValue) {
    if (!brand) {
      console.error('Brand not defined');
      return;
    }

    const ENTITY_PATH = `figma/brands/${brand}/themes/${theme}/${entityType}/${entityValue}`;

    const selector = this.generateSelector(
      brand,
      theme,
      entityType,
      entityValue
    );

    return {
      source: [
        `figma/global-base/*.json`,
        `figma/brands/${brand}/*.json`,
        `${ENTITY_PATH}/*.json`,
        `figma/brands/patterns/*.json`
      ],
      platforms: {
        css: {
          buildPath: `dist/css/`,
          transformGroup: 'tokens-studio',
          transforms: ['name/kebab'],
          files: [
            {
              filter: (token) =>
                token.filePath.includes(`${ENTITY_PATH}/base.json`),
              destination: `${brand.toLowerCase()}/themes/${theme.toLowerCase()}/${entityType}${
                entityType !== 'components'
                  ? '/' + entityValue.toLowerCase()
                  : ''
              }/base.css`,
              format: 'css/variables',
              options: { selector }
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
                token.filePath.includes(`${ENTITY_PATH}/base.json`),
              destination: `${brand.toLowerCase()}/themes/${theme.toLowerCase()}/${entityType}${
                entityType !== 'components'
                  ? '/' + entityValue.toLowerCase()
                  : ''
              }/base.scss`,
              format: 'scss/variables',
              options: { selector }
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
    };
  }

  static generateSelector(brand, theme, entityType, entityValue) {
    switch (entityType) {
      case 'schemes':
        return `.${brand.toLowerCase()}.theme-${theme.toLowerCase()}.scheme-${entityValue.toLowerCase()}`;

      case 'breakpoints':
        return `.${brand.toLowerCase()}.theme-${theme.toLowerCase()}.breakpoint-${entityValue.toLowerCase()}`;

      case 'components':
        return `.${brand.toLowerCase()}.theme-${theme.toLowerCase()}`;
    }
  }
}
