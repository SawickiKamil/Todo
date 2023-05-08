module.exports = {
  devServer: { port: 8080 },
  transpileDependencies: ['vuetify'],
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        additionalData: `
                  @use "@/styles/variables.sass" as *
                  @use "@/styles/mixins" as *
              `,
      },
    },
  },
}
