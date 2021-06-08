module.exports =  {
  locales: ["en", "zh"],
  sourceLocale: "zh",
  catalogs: [{
    path: "<rootDir>/src/locales/{locale}/messages",
    include: ["<rootDir>"],
    exclude: ["**/node_modules/**"],
  }],
  format: "po"
}
