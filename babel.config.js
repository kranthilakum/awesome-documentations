module.exports = {
  presets: [
    [
      "@vue/app",
      {
        useBuiltIns: "entry",
        polyfills: [
          "es.symbol",
          "es.array.iterator",
          "es.promise",
          "es.object.assign",
          "es.promise.finally",
        ],
      },
    ],
  ],
  plugins: [
    "@babel/plugin-transform-optional-chaining",
    "@babel/plugin-transform-nullish-coalescing-operator",
    "@babel/plugin-transform-class-properties",
  ],
};
