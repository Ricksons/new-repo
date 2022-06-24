import Vue from 'vue'
const moduleForm = {
    computed: {
        getFormTitle: function () {
            if (this.formTitle) {
                return this.formTitle
            } else {
                return ((!this.editMode) ? this.$ml.get('create') : this.$ml.get('edit')) + ' ' + this.module.info.caption
            }
        },
        actionButtonLabel: function () {
            if (!this.editMode) {
                return 'create';
            } else {
                return 'save'
            }
        },
        actionButtonIcon: function () {
            if (!this.editMode) {
                return 'el-icon-plus';
            } else {
                return 'el-icon-check'
            }
        },
        actionButtonType: function () {
            if (!this.validData) {
                return 'danger btn-small';
            } else {
                if (!this.editMode) {
                    return 'primary app-bg-primary';
                } else {
                    return 'primary'
                }
            }
        }
    },
    methods: {
        cancelEditableFullReload() {
            this.amReady = false
            this.editable = false
            Vue.nextTick(() => {
                this.amReady = true
                this.bindController()
            })
        },
        cancelEditable() {
            this.editable = false
        },
        removeAction() {
            this.moduleDeleteAction()
        },
        changeEditable() {
            this.editable = !this.editable
        },
    }
};

export default moduleForm
