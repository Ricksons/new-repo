<template>
  <loadingSpinner v-show="$store.state.ajaxManager.loadingRequests"></loadingSpinner>
  <router-view v-show="!$store.state['App-App-state'].isLoading"></router-view>
</template>
<script>
import loadingSpinner from '@/components/LoadingSpinner.vue'
import {mapState} from 'vuex'
// import {defineAsyncComponent} from 'vue'

export default {
  computed: {
    ...mapState('ajaxManager', ['loadingRequests'])
  },
  components: {
    loadingSpinner,
    //myCompontent: defineAsyncComponent(() => import('./components/Tmtm.vue')) /* webpackChunkName: "TMTM" */))
  },
  beforeMount() {
    document.body.style.direction = $langConfig.dir;
    document.body.style.textAlign = $langConfig.align;
  }
}
</script>
