module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '14'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@config': './src/config',
        '@models': './src/app/models',
        '@controllers': './src/app/controllers',
        '@views': './src/app/views',
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
