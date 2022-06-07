# Folders-app

## Requirements to develop and deploy

1) Node.js 16 and NPM
2) VueCLI 5
3) Vue.js 3
4) Electron 13

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
    
    
## Setup

1) `vue create project-name`
2) `cd project-name`
3) `vue add electron-builder`
4) `npm install electron`
5) `npm install bootstrap@latest`

Now you're ready to copy my code into you app directory and explore!

### Compiles and hot-reloads for development

Change `"devTools: true"` under webPreferences in `background.js` to enable inspector
```
npm run electron:serve
```

### Compiles and minifies for production
```
npm run electron:build
```
