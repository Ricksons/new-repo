<template>
  <el-aside :class="$langConfig.cssClass" class="esb-sidenav nav-abs-background-color" id="el-aside-menu">
    <el-menu
        :collapse="isCollapsed"
        :collapse-transition="true"
        :default-active="$store.state['App-SideMenu-state'].currentActiveSection"
        :default-openeds="currentActiveMenus"
        :router="false"
        :unique-opened="true"
        @close="handleClose"
        @select="handleOpen"
        active-text-color="#151B26"
        background-color="#212529"
        text-color="#fff">


      <div class="p-3 text-white text-center">
        <div class="d-inline-block bg-white" style="width: fit-content;border-radius: 50%; padding: 10px 15px;">
          <img src="@/../public/img/logo/logo.png" width="35px"/>
        </div>
        <h6 class="text-white font-weight-bold mt-1">
          {{ $store.state['App-App-state'].title }}
          <small>{{ $store.state['App-App-state'].version }}</small>
        </h6>
        <!--<span class="info d-inline-block w-100 pl-4">
          <h6>{{ strCFL(getSessionData('display_name')) }}</h6>
          <div class="mb-3 w-100">
            <small>{{ getSessionData('profile_caption') }}</small>
          </div>
        </span>-->
      </div>

      <!-- User Modules -->
      <div :key="namespaceKey" class="w-100" v-for="(namespace, namespaceKey) in $hkms.modules">
        <MenuLink :key="moduleKey" :module="$hkms.modules[namespaceKey][moduleKey]"
                  v-for="(module, moduleKey) in $hkms.modules[namespaceKey]">
        </MenuLink>
      </div>

    </el-menu>
  </el-aside>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {getLS, strCFL} from 'devegram-javascript-util';
import MenuLink from './MenuLink';

export default {
  components: {
    MenuLink: MenuLink
  },
  data() {
    return {
      drawerOpen: true,
      tempModule: null,
      tempModuleSideMenu: null,
      tempModuleSideMenuChildren: [],
      isCollapsed: this.$store.state['App-SideMenu-state'].isCollapsed,
      currentActiveMenus: Object.values(this.$store.state['App-SideMenu-state'].activeSubMenus),
      hasTestingPanelModule: this.$store.hasModule('voip-testing-panel-api'),
      divisionsList: []
    }
  },
  methods: {
    handleDrawerClose() {
      $store.state['App-App-state'].isDrawerOpen = false
    },
    moduleHasChildren(moduleName) {
      this.tempModule = null
      this.tempModuleSideMenu = null
      if (this.$hkms.modules.hasOwnProperty(moduleName)) {
        this.tempModule = this.$hkms.modules[moduleName]
        //this.tempModuleSideMenu = this.tempModule.sideMenu
        if (this.tempModuleSideMenu) {
          if (this.tempModuleSideMenu.hasOwnProperty('children')) {
            this.tempModuleSideMenuChildren = this.tempModuleSideMenu.children
            return true
          }
        }
      }
      return false
    },
    strCFL(s) {
      if (!s) return s;
      return strCFL(s)
    },
    getSessionData(key) {
      return getLS('user')[key]
    },
    handleOpen(key, keyPath) {
      this.$store.dispatch('App-SideMenu-state/updateActiveMenus', {
        key: keyPath[0],
        action: 'add'
      });
      this.$store.state['App-SideMenu-state'].currentActiveSection = key;
    },
    handleClose(key, keyPath) {
      this.$store.dispatch('App-SideMenu-state/updateActiveMenus', {
        key: keyPath[0],
        action: 'remove'
      })
    }
  },
  computed: {
    ...mapState('App-User-state', ['modules']),
    collapseIcon() {
      this.$store.dispatch('sideNavStore/updateCollapsed', {
        isCollapsed: this.isCollapsed
      });
      if (this.isCollapsed) {
        return 'el-icon-d-arrow-right';
      } else {
        return 'el-icon-d-arrow-left';
      }
    }
  },
  mounted() {
    //document.getElementById('el-aside-menu').style.width = '200px'
  }
}
</script>

<style lang="scss">
.router-link-exact-active {}

.esb-sidenav {
  border: none !important;
  overflow-x: hidden;
  transition: width .3s ease-in-out;
  z-index: 10;
  .el-menu {
    width: 200px !important;
    left: 1px;
    background-color: #212529;
  }
}

.el-submenu .is-opened {
  width: 100% !important;
}

.esb-sidenav {
  a.router-link-exact-active {
    text-decoration: none !important;

    .el-menu-item i {
      /*color: #151B26 !important;*/
    }
  }
}

.esb-sidenav a.router-link-exact-active .el-menu-item {
  /*color: #151B26 !important;
  text-decoration: none !important;
  background-color: #F2F2F0 !important;*/
}

.el-submenu__title .el-icon-arrow-down {
  padding-top: 5px;
  transform: scale(1.2);
  color: #fff !important;
}

.esb-sidenav a:active {
  color: transparent;
}

.el-menu--collapse {
  .avatar-pic {
    .info {
      display: none;
    }
  }
}

.el-menu .el-menu--inline {
  background-color: #1d3752 !important;
}

.esb-sidenav .el-submenu__title {
  color: #F2F2F0;
  /*background-color: rgba(20,20,20, .5) !important;*/
}

.esb-sidenav .el-menu-item.is-active::before {
  content: "";
  width: 1px;
  height: 50px;
  position: absolute;
  left: 0px;
  display: block;
  color: #C4D4F2 !important;
  background-color: #F2F2F0;
  box-shadow: 0px 0px 2px #F2F2F0;
  transition: box-shadow .4s ease-in-out;
}

.esb-sidenav .el-menu-item.is-active {
  width: 1100% !important;
  background-color: rgba(167, 184, 217, 0.2) !important;
  box-shadow: 0px 0px 2px #F2F2F0;
  transition: box-shadow .4s ease-in-out;
}

.esb-sidenav .el-submenu__title:hover, .esb-sidenav .el-menu-item {
  width: 1100% !important;
}

.esb-sidenav .el-submenu__title:hover, .esb-sidenav .el-menu-item:hover {
  background-color: rgba(167, 184, 217, 0.2) !important;
  width: 1100% !important;
  color: #fff !important;
}

.esb-sidenav .el-submenu__title:hover i {
  /*color: #151B26;*/
}


/* rtl */
.esb-sidenav.rtl {
  overflow-x: hidden;

  .el-submenu, .el-menu-item {
    /*text-align: right;
    position: relative;
    left: 50px;*/
  }

  .is-opened .el-submenu__title {
    width: 100%;
    /*background-color: #060606 !important;
    color: #fff !important;
    width: 200%;
    margin-bottom: 12px;*/
  }
}

.el-submenu.is-opened {

  background-color: transparent !important;
}

.esb-sidenav .el-menu-item {

  background-color: transparent !important;
}

.esb-sidenav .el-menu-item.is-active {
  color: #fff !important;
  font-weight: bold;
  /*background-color: #464646 !important;
  box-shadow: 0 0px 2px #fff, 0 0px 2px #fff;
  width: 200% !important;*/
}

/*.esb-sidenav .el-submenu__title i {
    color: #F2F2F0;
}*/


.nav-abs-background-color {
  background-color: #212529;
}
</style>
