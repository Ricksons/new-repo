<template>
  <component :is="mode" v-bind="$attrs"></component>
</template>

<script>
import { markRaw} from 'vue';

export default {
  name: 'RemoteBaseComponent',
  props: {
    type: String,
  },
  data() {
    return {
      mode: ''
    }
  },
  inheritAttrs: false,
  mounted() {
    this.loadScript();
  },
  methods: {
  loadScript() {
      fetch(`http://192.168.1.2:9900/${this.type}.js`).then((res) => {
        if (res.status === 200) {
          res.text().then((code) => {
            new Function(`${code}`)()
            // window.eval(code)
            this.mode = markRaw(window.MyComponent.default);
          })
        }
      })
    }
  }
}
</script>