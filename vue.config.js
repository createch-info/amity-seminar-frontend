const webpack =require("webpack")
module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
              Vue: ['vue/dist/vue.esm.js', 'default'],
              jQuery: 'jquery',
              'window.jQuery': 'jquery',
              'luxon':'luxon',
              $: 'jquery',
              moment: 'moment',
            }),
          ]  
    }
  }