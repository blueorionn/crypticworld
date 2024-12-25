module.exports = {
  // Basic formatting rules
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 120,

  // HTML specific
  htmlWhitespaceSensitivity: 'css',
  bracketSameLine: false,

  // CSS specific
  singleAttributePerLine: false,

  // Override specific settings for different file types
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html',
      },
    },
    {
      files: '*.css',
      options: {
        parser: 'css',
      },
    },
    {
      files: '*.js',
      options: {
        parser: 'babel',
      },
    },
  ],
};
