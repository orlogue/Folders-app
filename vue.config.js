const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        productName: "Folders",
        win: {
          icon: 'public/icons/win-linux/folders.png',
          "requestedExecutionLevel": "requireAdministrator"
        },
        mac: {
          // hardenedRuntime: true,
          icon: 'public/icons/mac/folders.icns',
          category: "public.app-category.utility",
        },
      },
    },
  },
}