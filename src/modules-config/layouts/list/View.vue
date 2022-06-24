<template>
  <div>
    <el-row class="title dg-module-container mb-2" v-if="header">
      <el-col :span="(!createAction)? 24 : 12" class="">
        <h6 class="text-capitalize" v-html="getHeaderTitle()"></h6>
      </el-col>
      <el-col :span="12" class="text-right" v-if="createAction">
        <dg-button :click="createAction" fieldSize="mini" :class="headerActionClass" :translate="headerActionTranslate" :icon="headerActionIcon" :text="headerActionText"
                   :type="headerActionType"></dg-button>
      </el-col>
    </el-row>
    <div class="dg-module-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headerActionClass: {
      required: false,
      default: ''
    },
    headerActionTranslate: {
      required: false,
      default: true
    },
    headerActionText: {
      required: false,
      default: 'create'
    },
    headerActionIcon: {
      required: false,
      default: 'el-icon-plus'
    },
    headerActionType: {
      required: false,
      default: 'primary'
    },
    header: {
      required: false,
      default: true
    },
    title: {
      required: false,
      default: false
    },
    leftCol: {
      required: false,
      default: 12
    },
    rightCol: {
      required: false,
      default: 12
    },
    module: {
      required: true
    },
    createAction: {
      required: false,
      default: true
    }
  },
  methods: {
    getHeaderTitle() {
      if (!this.title) {
        return this.$ml.get('list') + ' ' + this.module.info.caption
      } else {
        return this.title
      }
    }
  },
  data() {
    return {}
  }
}
</script>
