<template>
  <el-container class="esb-container">
    <esbSidenav></esbSidenav>
    <el-container id="content-main-container" style="height: 100vh; overflow-y: auto;background-color: #f0f0f0;color: #1b1e21">

      <el-col :span="24">
        <el-main>
          <transition name="slide-fade" class="h-100">
            <router-view :key="$route.fullPath"></router-view>
          </transition>
        </el-main>
      </el-col>
    </el-container>
    <!--<el-col :span="24">
        <esb-breadcrumb></esb-breadcrumb>
    </el-col>-->
  </el-container>
</template>

<script>
  import Vue from "vue";

  import esbSidenav from './layout/sidenav/View'
  import esbHeader from './layout/header/View'
  export default {
    components: {
      esbSidenav,
      esbHeader
    },
    data () {
      return {
        controller: this
      }
    },
    mounted() {
      setTimeout(() => {
        if ($store.getters['App-User-state/isAuthenticated']) {
          let links = document.head.getElementsByTagName('link')
          links.forEach( (l) => {
            if (l.getAttribute('portal') == 'portal-home') {
              l.parentNode.removeChild(l)
            }
          })
        }
      }, 200)
    }
  };
</script>

<style scoped>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.5, 0.5, 0.8, 0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>

<!--<style scoped>
  @import "/portals/cpanel/style.css";
</style>-->
