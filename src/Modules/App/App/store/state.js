const state = {
    namespaced: true,
    state: {
        title: process.env.VUE_APP_PUBLIC_TITLE,
        version: 'v1.4',
        client: 'Jikatel',
        isLoading: true,
        isDrawerOpen: true
    },
    actions: {
        doneLoading(ctx, params ) {
            ctx.commit('DONE_LOADING');
        },
        setState ({ commit }, params) {
            commit('SET_STATE', params)
        },
    },
    mutations: {
        DONE_LOADING(state) {
            state.isLoading = false;
        },
        SET_STATE (state, params) {
            state[params.key] = params.value
        },
    }
}

export default state
