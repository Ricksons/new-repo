<template>
    <appBoard>
        <moduleForm
            :bindingForView="true"
            :dataToBind="entityDataToBind"
            :edit-mode="true"
            :on-create-callback="null"
            :on-edit-callback="onEditCallback"></moduleForm>
    </appBoard>
</template>

<script>
    export default {
        data() {
            return {
                entityDataToBind: []
            }
        },
        components: {
            moduleForm: () => import('./../form/View.vue'),
        }
    }
</script>
