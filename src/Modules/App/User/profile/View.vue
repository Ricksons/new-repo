<template>
    <div>
        <app-board :header="false" class="p-3 mb-3">
            <moduleForm
                formTitle="Profile"
                :bindingForView="true"
                :dataToBind="entityDataToBind"
                :showPasswordField="false"
                :onCreateCallback="false"
                :edit-mode="true"></moduleForm>
        </app-board>

        <changePassword></changePassword>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                entityDataToBind: $store.state['App-User-state'].profile
            }
        },
        components: {
            moduleForm: () => import('./../form/View.vue'),
            changePassword:  () => import('./../security/ChangePassword.vue')
        }
    }
</script>
