const sideNavStore = {
  namespaced: true,
  state: {
    isCollapsed: false,
    activeSubMenus: {},
    activeLink: '',
    currentActiveSection: ''
  },
  actions: {
    update (ctx, params) {
      ctx.commit('UPDATE', params);
    },
    updateCollapsed (ctx, params) {
      ctx.commit('UPDATE_COLLAPSED', params);
    },
    updateActiveMenus (ctx, params) {
      ctx.commit('UPDATE_ACTIVE_MENUS', params);
    }
  },
  mutations: {
    UPDATE (state, params) {
      for (let x in params) {
        state[x] = params[x];
      }
    },
    UPDATE_ACTIVE_MENUS (state, params) {
      if (params.action == 'add') {
        state.activeSubMenus[params.key] = params.key;
      } else if (params.action == 'remove') {
        delete state.activeSubMenus[params.key];
      }
    },
    UPDATE_COLLAPSED (state, params) {
      state.isCollapsed = params.isCollapsed;
    }
  },
  getters: {
    activeSubMenus: state => {
      // console.log('current OBJECT: ', state.activeSubMenus)
      return Object.values(state.activeSubMenus);
    }
  }
};

export default sideNavStore
