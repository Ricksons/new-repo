<template>
    <el-button :icon="params.props.icon" :style="params.props.style" @click="click">{{params.props.text}}</el-button>
</template>

<script>
export default {
  methods: {
    click () {
      this.params.props.action(this.params.data, this.params.props, this.params.rowIndex)
    }
  }
}
</script>
