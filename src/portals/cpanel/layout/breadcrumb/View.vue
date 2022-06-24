<template>
    <el-breadcrumb separator="/" :class="{'float-right': V_langDir == 'rtl' }">
        <el-breadcrumb-item v-for="(segment, key) in segments" :key="key">
            <router-link :to="nextPath(segment)">{{segment.toUpperCase()}}</router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
let pathBuilder = null;
export default {
  data () {
    let segments = this.$route.fullPath.split('/');
    segments.shift();
    return {
      segments: segments
    }
  },
  beforeMount () {
    pathBuilder = '/';
  },
  methods: {
    nextPath (segment) {
      pathBuilder = pathBuilder + segment + '/';
      return pathBuilder.replace(/\/\//g, '/')
    }
  }
}
</script>

<style lang="scss">
    .el-breadcrumb {
        background-color: #fff;
        padding: 15px 30px;
        border-bottom: 1px solid #F2F2F0;
    }
</style>
