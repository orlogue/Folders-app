<template>
  <div class="inner-wrap"
       @contextmenu="openFolderCreationMenu($event)"
  >
    <ul id="files" class="main-grid">
      <li
          id="file"
          class="card"
          v-for="file in files"
          :key="file.name"
          :class="{ clickable: file }"
          @click="onFileClick(file)"
          @contextmenu="openContextMenu($event, file)"
          @contextmenu.stop
      >
        <div class="card-body d-flex flex-column align-items-center">
          <div class="mb-1 d-flex justify-content-center align-items-center">
            <IconFolder class="icon-folder" v-if="file.directory"/>
            <IconFile class="icon-file" v-else/>
          </div>
          <textarea
              id="title"
              type="text"
              @focus="autoGrow"
              @keyup="autoGrow"
              v-if="renameToggle && chosenFile === file.name"
              rows="1"
              v-model="newTitle"
              @keydown.enter="checkTitle(file, newTitle)"
              @click.stop
              @blur="closeInput"
              @keydown.esc="closeInput"
          ></textarea>
          <div v-else class="card-text">{{ file.name }}</div>
        </div>
      </li>
      <li v-if="this.$parent.createFolderStatus">
        <div class="card-body d-flex flex-column align-items-center">
          <div class="mb-1 d-flex justify-content-center align-items-center">
            <IconFolder class="icon-folder"/>
          </div>
          <textarea
              id="title"
              type="text"
              @focus="autoGrow"
              @keyup="autoGrow"
              rows="1"
              v-model="newTitle"
              @keydown.enter="checkCreationFolder(newTitle)"
              @click.stop
              @blur="closeInput"
              @keydown.esc="closeInput"
          ></textarea>
        </div>
      </li>
    </ul>
    <context-menu :display="showContextMenu" ref="menu">
      <li @mousedown="rename(this.file)">Переименовать<!-- Rename --></li>
      <li @mousedown="deleteF(this.file)">Удалить<!-- Delete --></li>
    </context-menu>
    <context-menu :display="showContextMenu" ref="creationMenu">
      <li @mousedown="createFolderMenu">Создать папку<!-- Create folder --></li>
    </context-menu>
  </div>
</template>


<script>
import IconFile from '@/components/icons/IconFile'
import IconFolder from '@/components/icons/IconFolder'
import ContextMenu from "@/components/ContextMenu";
import ContextMenuDataAndFunctions from "@/contextMenuDataAndFunctions";

export default {
  name: "IconsView",
  components: {
    IconFile,
    IconFolder,
    ContextMenu,
  },
  mixins: [ContextMenuDataAndFunctions],
  emits: ['folderClick', 'fileClick', 'deleteFile', 'renameFile', 'createFolder'],
  props: {
    files: {type: Array, default: () => []},
  },
  setup(_, {emit}) {
    const onFileClick = file => {
      if (file.directory) emit('folderClick', file)
      else emit('fileClick', file)
    }
    const deleteFile = file => {
      emit('deleteFile', file)
    }
    const renameFile = (file, newTitle) => {
      emit('renameFile', {file: file, title: newTitle})
    }
    const createFolder = (title) => {
      emit('createFolder', title)
    }
    return {
      onFileClick,
      deleteFile,
      renameFile,
      createFolder,
    }
  },
}
</script>

<style scoped>
.inner-wrap {
  min-height: 100vh;
}

.main-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  overflow: visible;
  justify-content: space-evenly;
  list-style: none;
  padding: 0;
  tab-index: 0;
  margin-bottom: 0;
  height: 100%;
}

.card {
  width: 150px;
  height: 160px;
  border: none;
  /*overflow: hidden;*/
}

.card-text {
  font-size: 14px;
  line-height: 19px;
  max-width: 140px;
  margin: 0 -12px;
  padding: 1px 8px;
  text-overflow: ellipsis;
  text-align: center;
}

textarea {
  font-size: 14px;
  line-height: 19px;
  max-width: 140px;
  resize: none;
  padding: 0 5px;
  min-width: 3ch;
  /*width: 20px;*/
  min-height: 19px;
  max-height: 95px;
  text-align: center;
  border-radius: 5px;
  box-sizing: content-box;
  outline: none;
  overflow: hidden;
  z-index: 1;
}

/*.form-control {*/
/*  width: unset;*/
/*  border-radius: 5px !important;*/
/*  font-size: 14px;*/
/*  line-height: 19px;*/
/*  max-width: 140px;*/
/*  margin: 0 -12px;*/
/*  padding: 1px 8px;*/
/*  text-overflow: ellipsis;*/
/*  text-align: center;*/
/*  resize: none;*/
/*  overflow: hidden;*/
/*  min-height: 19px !important;*/
/*  max-height: 57px;*/
/*}*/

.card:hover {
  overflow: visible;
}

.card:hover .card-text {
  background-color: rgba(0, 0, 0, 0.085);
  color: #212529;
  border-radius: 5px;
  z-index: 1;
}

.card:hover .icon-file, .card:hover .icon-folder {
  background-color: rgba(0, 0, 0, 0.085);;
  color: #212529;
  border-radius: 5px;
}

.clickable {
  cursor: pointer;
}

.icon-folder {
  width: 80px;
}

.icon-file {
  width: 80px;
  height: 80px;
  padding: 9px;
}
</style>