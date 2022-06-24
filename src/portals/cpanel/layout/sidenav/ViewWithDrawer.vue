<template>
  <el-drawer
      :before-close="handleDrawerClose"
      :visible.sync="$store.state['App-App-state'].isDrawerOpen"
      :with-header="false"
      size="256"
      :modal="true"
      :append-to-body="true"
      direction="ltr"
      title="Menu">
    <el-aside :class="$langConfig.cssClass" class="esb-sidenav">
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
          background-color="#31686b"
          text-color="#fff">
        <!-- style="height: max-content;background-color: #191d21" -->


        <el-row class="user_brief">
          <el-col :span="24" class="pl-4" style="padding-top: 20px">
            <!--                    <img src="/img/logo/logo.png" width="42px"/>-->
            <h5 class="text-white font-weight-bold">{{ $store.state['App-App-state'].title }}
              <small>{{ $store.state['App-App-state'].version }}</small>
            </h5>
          </el-col>
          <el-col :span="24" class="text-white hidden-sm-and-down">
                    <span class="info d-inline-block w-100 pl-4">
                        <h6>{{ strCFL(getSessionData('display_name')) }}</h6>
                        <div class="mb-3 w-100">
                            <small>{{ getSessionData('profile_caption') }}</small>
                        </div>
                    </span>
          </el-col>
        </el-row>

        <!--<el-button type="info" @click="isCollapsed = !isCollapsed"  :icon="collapseIcon" size="small" style="margin-top: 0px;margin-bottom: 30px;"></el-button>-->


        <div :key="key" class="w-100" v-for="(module, key) in $hkms.modules">
          <menu-link :module="$hkms.modules[key]">
          </menu-link>
        </div>
      </el-menu>
    </el-aside>
  </el-drawer>

</template>

<script>
import {mapState} from 'vuex'
import {strCFL} from 'devegram-javascript-util';
import MenuLink from './MenuLink';
import {getLS} from 'devegram-javascript-util';

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
      currentActiveMenus: Object.values(this.$store.state['App-SideMenu-state'].activeSubMenus)
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
    /*if (this.modules.hasOwnProperty('simple-customer-order')) {
        cxt.$store.dispatch('simpleCustomerOrderAPI/getPendingRequestsCount').then((r) => {
            cxt.$store.state.simpleCustomerOrderStore.pendingRequests = r
        })
        setInterval(function () {
            cxt.$store.dispatch('simpleCustomerOrderAPI/getPendingRequestsCount').then((r) => {
                cxt.$store.state.simpleCustomerOrderStore.pendingRequests = r
            })
        }, 15000)
    }*/
    // alert(Object.values(this.$store.state['App-SideMenu-state'].activeSubMenus))
  }
}
</script>

<style lang="scss">
.router-link-exact-active {
}

.esb-sidenav {
  border: none !important;
  overflow-x: hidden;
  width: 230px !important;
  height: 100vh !important;
  background-color: #31686b;
  z-index: 10;

  .user_brief {
    .info {
    }
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

</style>
