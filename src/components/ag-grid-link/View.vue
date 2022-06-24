<template>
  <a :href="params.data[params.props.urlProp]" target="_blank">{{getText()}}</a>
</template>

<script>
export default {
  methods: {
    getText () {
      if (this.params.props.textFromProp) {
        return this.params.data[this.params.props.textFromProp]
      } else {
        return this.params.props.text
      }
    }
  }
}
</script>
