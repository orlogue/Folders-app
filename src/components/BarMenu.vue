<template>
  <div id="BarMenu" class="navbar sticky-top form-group d-flex px-4 py-3 align-items-center">
      <button
          class="me-3 arrow-button"
          @click="goBack"
      >
          <ArrowLeft/>
      </button>
    <button id="newFolder"
            @click="createFolderFromBM"
            class="btn btn-light shadow-none clickable"
    >
      Создать папку
    </button>
    <div class="options ms-3 d-flex align-items-center">
      <span class="fs-5 me-2 unselectable">Вид:<!-- View: --></span>
      <select
          @change="onChange($event)"
          class="form-select shadow-none clickable unselectable"
      >
        <option value="icons">Иконки<!-- Icons --></option>
        <option value="list">Список<!-- List --></option>
      </select>
    </div>
    <button id="showHidden"
            class="btn btn-light shadow-none ms-3 clickable"
            @click="showHidden"
            :class="{'active-button': showHiddenBool}"
    >
      Скрытое<!-- Hidden -->
    </button>
    <div class="ms-auto col-3">
      <!-- Search -->
      <input
          :value="searchString"
          @input="$emit('update:searchString', $event.target.value)"
          class="form-control shadow-none"
          placeholder="Поиск"
      />
    </div>
  </div>
</template>

<script>
import ArrowLeft from '@/components/icons/ArrowLeft'

export default {
  name: "BarMenu",
  components: {
    ArrowLeft
  },
  props: {
    path: String,
    back: Function,
    showHiddenBool: Boolean,
    showHidden: Function,
    onChange: Function,
    searchString: String,
    createFolderFromBM: Function,
  },
  data() {
    return {
      cannotGoBack: this.$props.path === '/Users'
    }
  },
  methods: {
    goBack() {
      let cannotGoBack = this.$props.path === '/Users'
      if (!cannotGoBack) {
        return this.$props.back()
      }
    }
  }
}
</script>

<style>
.navbar {
  background-color: #f5f5f5;
  height: 70px;
}

.arrow-button {
  padding: 0;
  border: none;
  background: none;
}

.form-control, .btn, .form-select {
  border-radius: 10px !important;
}

.btn {
  background-color: white !important;
  border: 1px solid #ced4da !important;
}

.active-button {
  background-color: #e0e0e0 !important;
}

.form-control:focus, .form-select:focus {
  border-color: #949494 !important;
}

.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>