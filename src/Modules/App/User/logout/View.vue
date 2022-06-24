<template>
    <div></div>
</template>

<script>
    export default {
        created() {
            this.$store.dispatch('App-User-state/clearUserData').then(() => {
              window.location = this.$router.resolve({ name: 'portal-home' }).resolved.fullPath
                //this.$router.push()
            })
        }
    }
</script>
