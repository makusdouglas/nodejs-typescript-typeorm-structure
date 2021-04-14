module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@controllers': './src/app/controllers',
        '@middlewares': './src/app/middlewares',
        '@models': './src/app/models',
        '@views': './src/app/views',
        '@config': './src/config',
        '@lib': './src/lib',
        '@database': './src/database'
      }
      }],
    ["@babel/plugin-transform-flow-strip-types"],
    ["@babel/plugin-proposal-decorators", { "legacy": true}],
    ["@babel/plugin-proposal-class-properties", { "loose": true}]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
