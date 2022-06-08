export default {
  data() {
    return {
      renameToggle: false,
      chosenFile: "",
      newTitle: "",
      showContextMenu: false,
      file: Object,
    }
  },
  methods: {
    deleteF(file) {
      this.$refs.menu.close()
      this.deleteFile(file)
    },
    rename(file) {
      this.renameToggle = true;
      this.chosenFile = file.name;
      this.newTitle = this.chosenFile
      setTimeout(function () {
        let input = document.getElementById("title")
        input.focus();
        input.select();
        document.querySelector('#files').style.pointerEvents = 'none';
        document.querySelector('#title').style.pointerEvents = 'auto';
      }, 10);
    },
    closeInput() {
      this.renameToggle = false;
      document.querySelector('#files').style.pointerEvents = 'auto';
    },
    checkTitle(file, newTitle) {
      if (file.name !== newTitle) {
        this.renameFile(file, newTitle)
      } else {
        this.renameToggle = false
      }
    },
    openContextMenu(e, file) {
      this.$refs.menu.open(e);
      this.file = file;
    },
    autoGrow() {
      let textarea = document.getElementById('title');
      textarea.style.height = '5px';
      textarea.style.height = textarea.scrollHeight + 'px';

      textarea.style.width = '3ch';
      textarea.style.width = textarea.value.length + 'ch';
    }
  },
}