const moduleFormProps = {
    props: {
        formHeader: {
            required: false,
            default: false
        },
        formTitle: {
            required: false
        },
        editMode: {
            required: true,
            type: Boolean
        },
        onEditCallback: {
            required: false
        },
        onCreateCallback: {
            required: false
        },
        moduleDeleteAction: {
            required: false
        }
    }
};

export default moduleFormProps
