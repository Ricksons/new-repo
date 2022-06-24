<template>
  123
    <RemoteBaseComponent type="button-umb" text="Hello me" v-on:handleClick="handleClick"></RemoteBaseComponent>
    <abc></abc>
</template>

<script>
import RemoteBaseComponent from './components/RemoteBase.vue';
let a = __customLoader('/src/components/RoRo.vue')
export default {
  components: {
    RemoteBaseComponent,
    abc: a
  },
  methods: {
    handleClick() {
      console.log('click');
    }
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
