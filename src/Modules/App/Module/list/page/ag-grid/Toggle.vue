<template>
  <el-switch @change="change" v-model="toggleState"></el-switch>
</template>

<script>
export default {
  data() {
    return {
      toggleState: false
    }
  },
  beforeMount() {
    this.toggleState = (this.params.data.used_by_root === 1)
  },
  methods: {
    change(val) {
      let data = {
        value: val,
        module_id: this.params.data.id
      }
      this.params.props.actionsHandler('setUsedByRoot', data)
    }
  }
}
</script>
