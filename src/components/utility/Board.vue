<template>
    <div class="app-board">
        <el-row v-if="header" class="header">
            <el-col :span="leftCol">
                <slot name="leftContent"></slot>
            </el-col>
            <el-col :span="rightCol">
                <slot name="rightContent"></slot>
            </el-col>
        </el-row>
        <div :class="bodyClass">
          <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    header: {
      required: false,
      default: true
    },
    leftCol: {
      required: false,
      default: 12
    },
    rightCol: {
      required: false,
      default: 12
    },
    bodyClass: {
      required: false,
      default: ''
    }
  }
}
</script>
<style lang="scss">
    .app-board {
        background-color: #fff;
        padding: 0;
        border-radius: 14px;
        border: 1px solid #F2F2F0;
        box-shadow: 0 0 2px #A7B8D9;
        width: 100%;

        .header {
            border-bottom: 1px solid #F2F2F0;
            margin-bottom: 0px;
        }
    }
</style>
