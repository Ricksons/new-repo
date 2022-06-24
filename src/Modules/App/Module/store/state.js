import Vue from 'vue'

const state = {
  namespaced: true,
  state: {
    entities: [],
    openedEntity: {},
    pageChunkSize: 12,
  },
  actions: {    
    setState ({ commit }, params) {
      commit('SET_STATE', params)
    },
    setEntities ({ commit }, entities) {
      commit('SET_ENTITIES', entities)
    },
    setOpenedEntity ({ commit }, entity) {
      commit('SET_OPENED_ENTITY', entity)
    },
    addEntity ({ commit }, entity) {
      commit('ADD_ENTITY', entity)
    },
    removeEntity ({ commit }, entityId) {
      commit('REMOVE_ENTITY', entityId)
    },
  },
  mutations: {    
    SET_STATE (state, params) {
      state[params.key] = params.value
    },
    ADD_ENTITY (state, entity) {
      Vue.set(state.entities, entity.id, entity)
    },
    REMOVE_ENTITY (state, entityId) {
      Vue.delete(state.entities, entityId);    
    },
    SET_ENTITIES (state, entities) {
      state.entities = entities
    },
    SET_OPENED_ENTITY (state, entity) {
      state.openedEntity = entity
    }
  },
  getters: {}
};

export default state