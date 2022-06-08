<template>
  <table class="table table-hover" id="files">
    <thead>
    <tr class="head unselectable">
      <th scope="col"></th>
      <th scope="col">Имя<!-- Name --></th>
      <th scope="col" class="text-end">Дата создания<!-- Creation date --></th>
      <th scope="col" class="text-end">Размер<!-- Size --></th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="file in files"
        :key="file.name"
        :class="{ clickable: file }"
        @click="onFileClick(file)"
        @contextmenu="openContextMenu($event, file)"
    >
      <td class="icon-row">
        <div class="d-flex justify-content-center">
          <IconFolder class="icon-folder" v-if="file.directory"/>
          <IconFile class="icon-file" v-else/>
        </div>
      </td>
      <td class="textarea-wrapper" v-if="renameToggle && chosenFile === file.name">
        <textarea
            id="title"
            type="text"
            @focus="autoGrow"
            @keyup="autoGrow"
            rows="1"
            v-model="newTitle"
            @keydown.enter="checkTitle(file, newTitle)"
            @click.stop
            @blur="closeInput"
            @keydown.esc="closeInput"
        ></textarea>
      </td>
      <td class="name" v-else>{{ file.name }}</td>
      <td>
        <span class="float-end">{{ parseDate(file.created.toString()) }}</span>
      </td>
      <td>
        <span class="float-end">{{ file.size }}</span>
      </td>
    </tr>
    </tbody>
  </table>
  <context-menu :display="showContextMenu" ref="menu">
    <li @mousedown="rename(this.file)">Переименовать<!-- Rename --></li>
    <li @mousedown="deleteF(this.file)">Удалить<!-- Delete --></li>
  </context-menu>
</template>


<script>
import IconFile from '@/components/icons/IconFile'
import IconFolder from '@/components/icons/IconFolder'
import ContextMenu from "@/components/ContextMenu"
import ContextMenuDataAndFunctions from "@/contextMenuDataAndFunctions"

export default {
  name: "ListView",
  components: {
    IconFile,
    IconFolder,
    ContextMenu,
  },
  emits: ['folderClick', 'fileClick', 'deleteFile', 'renameFile'],
  mixins: [ContextMenuDataAndFunctions],
  props: {
    files: {type: Array, default: () => []}
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
    return {
      onFileClick,
      deleteFile,
      renameFile,
    }
  },
  methods: {
    parseDate(datetime) {
      const dt = datetime.split(' ')
      return dt[2] + ' ' + dt[1] + ' ' + dt[3] + ', ' + dt[4]
    }
  }
}
</script>

<style scoped>
tr {
  height: 57px;
}

table > :not(:first-child) {
  border-top: 0;
}

thead tr {
  height: 41px;
}

thead th {
  position: sticky;
  top: 70px;
  background-color: white;
  border-bottom: none;
  box-shadow: inset 0 -2px 0 #212529;
}

td {
  border-color: transparent;
}

.textarea-wrapper {
  max-width: 400px;
}

textarea {
  font-size: 16px;
  line-height: 24px;
  height: 24px;
  max-width: 100%;
  max-height: 48px;
  padding: 0;
  resize: none;
  border-radius: 5px;
  box-sizing: content-box;
  outline: none;
  overflow: hidden;
  z-index: 1;
}

.icon-row {
  width: 2em;
}

.name {
  max-width: 400px;
  /*overflow-wrap: break-word;*/
  overflow: hidden;
  text-overflow: ellipsis;
}

.size {
  max-width: 70px;
}

.name:hover {
  overflow: visible;
  overflow-wrap: anywhere;
}

.icon-folder {
  width: 40px;
  height: 40px;
}

.icon-file {
  width: 40px;
  height: 40px;
  padding: 4px;
}
</style>