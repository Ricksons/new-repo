<template>
  <el-menu :collapse-transition="true" :default-active="activeIndex" :router="true" @select="handleSelect"
   active-text-color="#1d3752" background-color="#333" class="esb-header" menu-trigger="hover" mode="horizontal"
           text-color="#fff">

    <el-menu-item class="float-left" @click="menuOpenToggle">
      <i class="el-icon-arrow-left"></i>
    </el-menu-item>
    <el-menu-item index="header-1" class="float-right">
      <a :href="currentDomain" target="_blank">
        <i class="el-icon-s-home"></i>
      </a>
    </el-menu-item>
    <el-submenu index="header-2" class="float-right">
      <template slot="title">
        <i class="el-icon-user-solid"></i>
      </template>
      <el-menu-item :index="$router.resolve({name: 'module->user->active->profile'}).resolved.fullPath">
        {{ $ml.get('profile') }}
      </el-menu-item>
      <el-menu-item :index="$router.resolve({name: 'module->user->logout'}).resolved.fullPath">
        {{ $ml.get('logout') }}
      </el-menu-item>
    </el-submenu>


  </el-menu>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      currentDomain: process.env.VUE_APP_CURRENT_DOMAIN,
      userProfileId: $store.state['App-User-state'].profile.profile_id,
      sideMenuRef: null
    };
  },
  mounted() {
    this.sideMenuRef = document.getElementById('el-aside-menu')
  },
  methods: {
    drawerOpenToggle() {
      $store.state['App-App-state'].isDrawerOpen = !$store.state['App-App-state'].isDrawerOpen
    },
    menuOpenToggle() {
      //$store.state['App-App-state'].isDrawerOpen = !$store.state['App-App-state'].isDrawerOpen
      let w = this.sideMenuRef.style.width
      if (w === '0px') {
        this.sideMenuRef.style.width = '200px'
      } else {
        this.sideMenuRef.style.width = '0px'
      }
    },
    handleSelect(key, keyPath) {}
  }
}
</script>

<style lang="scss">
.esb-header {
  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #000621 !important
  }

  .el-menu-item, .el-submenu {
    /*float: right !important;*/
  }

  .el-menu-item {
    /*text-align: right !important;*/
  }
}

.el-menu.el-menu--horizontal {
  border-bottom: none !important;
}

.el-menu-item a {
  color: #fff !important;
  text-decoration: none !important;
}
</style>
