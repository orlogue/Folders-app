<template>
  <BarMenu
      :path="path"
      :show-hidden="showHidden"
      :show-hidden-bool="showHiddenBool"
      :create-folder-from-b-m="createFolderFromBM"
      :back="back"
      :on-change="onChange"
      v-model:search-string="searchString"
  />
  <div class="wrapper">
    <IconsView
        v-if="view === 'icons'"
        :files="filteredFiles"
        @folderClick="open($event.name)"
        @fileClick="openFile($event.name)"
        @deleteFile="deleteFile($event)"
        @renameFile="renameFile($event)"
        @createFolder="createFolder($event)"
    />
    <ListView
        v-else
        :files="filteredFiles"
        @folderClick="open($event.name)"
        @fileClick="openFile($event.name)"
        @deleteFile="deleteFile($event)"
        @renameFile="renameFile($event)"
        @createFolder="createFolder($event)"
    />
  </div>
  <div class="footer">
    <a
        class="link-dark clickable text-decoration-none"
        v-for="(pth, index) in path.split('/')"
        v-bind:key="index"
        @click="goToDir(index)"
    >{{ pth }}/</a>
  </div>
</template>

<script>
import fs from 'fs'
import pathModule from 'path'
import {computed, ref} from "vue";
import {shell} from "electron";
import IconsView from "@/components/grid/IconsView";
import ListView from "@/components/grid/ListView";
import BarMenu from "@/components/BarMenu";
import {dialog} from "@electron/remote"

const formatSize = size => {
  if (!size) return '0 B'
  let i = Math.floor(Math.log(size) / Math.log(1024));
  return (
      (size / Math.pow(1024, i)).toFixed(2) + " " +
      ['B', 'kB', 'MB', 'GB', 'TB'][i]
  )
}

export default {
  components: {
    ListView,
    IconsView,
    BarMenu,
  },
  setup() {
    const path = ref('/Users/george')
    const files = computed(() => {
      const fileNames = fs.readdirSync(path.value)
      return fileNames
          .map(file => {
            const stats = fs.statSync(pathModule.join(path.value, file))
            return {
              name: file,
              size: stats.isFile() ? formatSize(stats.size ?? 0) : '--',
              directory: stats.isDirectory(),
              created: stats.birthtime,
            }
          })
          .sort((a, b) => {
            if (a.directory === b.directory) {
              return a.name.localeCompare(b.name)
            }
            return a.directory ? -1 : 1
          })
    })
    const back = () => {
      path.value = pathModule.dirname(path.value)
    }
    const open = folder => {
      path.value = pathModule.join(path.value, folder)
    }
    const openFile = file => {
      shell.openPath(pathModule.join(path.value, file))
    }
    const searchString = ref('')
    const showHiddenBool = ref(false)
    const filteredFiles = computed(() => {
      if (!showHiddenBool.value) {
        if (searchString.value) {
          return files.value.filter(s => !s.name.startsWith('.') && s.name.toLowerCase().includes(searchString.value.toLowerCase()))
        } else {
          return files.value.filter(s => !s.name.startsWith('.'))
        }
      } else {
        if (searchString.value) {
          return files.value.filter(s => s.name.toLowerCase().includes(searchString.value.toLowerCase()))
        } else {
          return files.value
        }
      }
    })
    const deleteFile = file => {
      if (file.directory) fs.rmSync(pathModule.join(path.value, file.name), {recursive: true, force: true})
      else fs.unlinkSync(pathModule.join(path.value, file.name))

      const tmp = path.value
      path.value = '/Users'
      path.value = tmp
    }
    const goToDir = id => {
      let currentPathArr = path.value.split('/')
      path.value = currentPathArr.slice(0, id + 1).join('/')
    }
    const renameFile = ({file, title}) => {
      if (files.value.find(s => s.name === title)) {
        dialog.showMessageBoxSync(require('@electron/remote').getCurrentWindow(), {
          type: 'warning',
          title: 'Ошибка',
          buttons: ['Отменить'],
          normalizeAccessKeys: true,
          message: 'Папка/файл с таким названием уже существует!',
        });
      } else {
        fs.renameSync(pathModule.join(path.value, file.name), pathModule.join(path.value, title))
        const tmp = path.value
        path.value = '/Users'
        path.value = tmp
      }
    }
    const createFolder = (title) => {
      if (files.value.find(s => s.name === title)) {
        dialog.showMessageBoxSync(require('@electron/remote').getCurrentWindow(), {
          type: 'warning',
          title: 'Ошибка', //Error
          buttons: ['Отменить'], //Cancel
          normalizeAccessKeys: true,
          message: 'Папка/файл с таким названием уже существует!', //Folder/file with this title already exists.
        });
      } else {
        fs.mkdirSync(pathModule.join(path.value, title))
        const tmp = path.value
        path.value = '/Users'
        path.value = tmp
      }
    }
    return {
      path,
      open,
      openFile,
      back,
      files,
      searchString,
      showHiddenBool,
      filteredFiles,
      deleteFile,
      goToDir,
      renameFile,
      createFolder,
    }
  },
  data() {
    return {
      view: 'icons',
      createFolderStatus: false,
    }
  },
  methods: {
    onChange(e) {
      this.view = e.target.value
    },
    showHidden() {
      this.showHiddenBool = !this.showHiddenBool
    },
    createFolderFromBM() {
      this.createFolderStatus = true
      this.newTitle = ""
      setTimeout(function () {
        let input = document.getElementById("title")
        input.focus();
        input.select();
        document.querySelector('#files').style.pointerEvents = 'none';
        document.querySelector('#title').style.pointerEvents = 'auto';
      }, 10);
    }
  },
}
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}

.wrapper {
  margin: 0 20px 44px 20px;
  min-height: 100vh;
}

.footer {
  width: 100%;
  position: fixed;
  background: #eeeeee;
  bottom: 0;
  padding-left: 20px;
  line-height: 44px;
  z-index: 100;
}

.clickable {
  cursor: pointer;
}
</style>
