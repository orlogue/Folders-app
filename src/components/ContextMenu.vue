<template>
  <ul
      class="context-menu"
      v-show="show"
      :style="style"
      ref="context"
      tabindex="0"
      @blur="close"
  >
    <slot></slot>
  </ul>
</template>
<script>
import {nextTick} from 'vue';

export default {
  name: 'ContextMenu',
  props: {
    display: Boolean,
  },
  data() {
    return {
      left: 0,
      top: 0,
      show: false,
    };
  },
  computed: {
    style() {
      return {
        top: this.top + 'px',
        left: this.left + 'px',
      };
    },
  },
  methods: {
    close() {
      this.show = false;
      this.left = 0;
      this.top = 0;
      document.querySelector('body').style.overflow = 'auto';
      document.querySelector('#files').style.pointerEvents = 'auto';
    },
    open(evt) {
      this.left = evt.clientX;
      this.top = evt.clientY;
      document.querySelector('body').style.overflow = 'hidden';
      document.querySelector('#files').style.pointerEvents = 'none';
      nextTick(() => this.$el.focus());
      this.show = true;
    },
  },
};
</script>

<style>

.context-menu {
  margin: 0;
  padding: 0;
  position: fixed;
  font-size: 14px;
  background: white;
  display: flex;
  flex-direction: column;
  z-index: 999;
  outline: none;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
}

.context-menu li {
  list-style-type: none;
  padding: 5px 10px;
}

.context-menu li:hover {
  background-color: rgba(0, 0, 0, 0.085);
}
</style>