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
        '@config': './src/config',
        '@models': './src/app/models',
        '@controllers': './src/app/controllers',
        '@views': './src/app/views',
        '@lib': './src/lib',
        '@database': './src/database'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
