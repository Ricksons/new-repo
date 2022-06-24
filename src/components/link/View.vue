<template>
  <a :href="url" target="_blank">{{text}}</a>
</template>

<script>
export default {
  props: {
    url: {
      required: true
    },
    text: {
      required: true
    }
  }
}
</script>
