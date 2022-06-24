<template>
  <div>
    <!-- @blur="returnToOriginal" @focusout="returnToOriginal"-->
    <span v-if="!editMode">
      <i class="el-icon-copy-document text-info mr-2" style="cursor: pointer" @click="copyToClipBoard"></i>
      <i class="el-icon-edit text-info mr-2" style="cursor: pointer" @click="fucusIn"></i>
      <span class="copy-to-target">{{cellValue}}</span>
    </span>
    <div class="editing-mode-container" :style="editContainerStyle" v-else>
      <i class="el-icon-circle-close text-danger" style="margin-right: 5px;" @click="returnToOriginal"></i>
      <el-input ref="input" @input="change" placeholder="" size="mini" v-model="cellValue" :style="'width:' +  inputWidth"></el-input>
      <el-button v-if="saveIsActive" @click="saveNewValue" class="ml-2" type="success" icon="el-icon-check" circle size="mini"></el-button>
      <!--  <el-button v-if="saveIsActive" @click="returnToOriginal" class="ml-2" type="danger" icon="el-icon-close" circle size="mini"></el-button>-->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      editMode: false,
      cellValue: '',
      originalValue: 0.00,
      saveIsActive: false,
      inputWidth: '120px',
      editContainerStyle: ''
    }
  },
  beforeMount() {
    if (this.params.props.editContainerStyle) {
      this.editContainerStyle = this.params.props.editContainerStyle
    }
    this.cellValue = this.params.data[this.params.props.valuePropertyName]
    this.originalValue = this.params.data[this.params.props.valuePropertyName]
    if (this.params.props.inputWidth) {
      this.inputWidth = this.params.props.inputWidth
    }
  },
  methods: {
    copyToClipBoard () {
      let copyText = this.$el.getElementsByClassName('copy-to-target')[0]
      const el = document.createElement('textarea');
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      el.value = copyText.innerText;
      document.body.appendChild(el);
      el.select();
      if (document.execCommand('copy')) {
        this.$notify({
          title: 'Copied to clipboard',
          type: 'success',
          showClose: false,
          duration: 1000
        });
      }
      document.body.removeChild(el);
    },
    fucusIn () {
      this.editMode = true
      Vue.nextTick(() => {
        this.$refs['input'].focus()
      })
    },
    fucusout () {
      this.returnToOriginal()
    },
    returnToOriginal () {
      this.editMode = false
      this.cellValue = this.originalValue
      this.saveIsActive = false
    },
    saveNewValue () {
      this.params.props.saveAction(this.params, this.cellValue, () => {
        this.editMode = false
        this.originalValue = this.cellValue
        this.saveIsActive = false
      }, this.params.props.valuePropertyName)
    },
    change(val) {
      if (this.originalValue !== this.cellValue) {
        this.saveIsActive = true
      } else {
        this.saveIsActive = false
      }

    }
  }
}
</script>

<style scoped>
.editing-mode-container {
  position: fixed;
  z-index: 1000;
  display: inline-block;
  width: 200px;
}
</style>
