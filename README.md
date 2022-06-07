# Folders-app

## Dependencies
    "@babel/core": "^7.12.16",
    "@babel/eslint-parser": "^7.12.16",
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-plugin-eslint": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "electron": "^13.6.9",
    "electron-devtools-installer": "^3.1.0",
    "eslint": "^7.32.0",
    "eslint-plugin-vue": "^8.0.3",
    "vue-cli-plugin-electron-builder": "~2.1.1"

## Project setup
```
npm install
```

### Compiles and hot-reloads for development

Change `"devTools: true"` under webPreferences in `background.js` to enable inspector
```
npm run electron:serve
```

### Compiles and minifies for production
```
npm run electron:build
```
