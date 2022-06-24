<template>
    <div class="mt-3">
        <div class="row">
            <div class="col-12 text-right mb-2">
                <dg-button class="mr-2" text="create" type="primary" icon="el-icon-plus" fieldSize="mini" :click="createAction"></dg-button>
            </div>
        </div>

        <el-dialog :visible.sync="dialogVisible" title="" top="5vh" width="75%">
            <moduleForm
                :bindingForView="true"
                :dataToBind="dataToBind"
                :edit-mode="editMode"
                :formHeader="true"
                :on-create-callback="afterCreate"
                class="p-0 m-0"
                v-if="dialogVisible"></moduleForm>
        </el-dialog>

        <app-board :header="false" class="p-3 mb-3">
            <div class="row">
                <div class="col-12 col-md-6">
                    <span class="mr-3">Search</span>
                    <span><el-input class="d-inline-block w-50" v-model="userSearch" size='mini'></el-input></span>
                </div>
                <div class="col-12 col-md-6">
                    <pagination
                        :currentPage="currentPage"
                        paginateClass=""
                        :page-count="getPagesCount()"
                        :page-range="4"
                        :margin-pages="2"
                        :navigateHandler="navigateToPage"></pagination>
                </div>
            </div>
        </app-board>

        <div :key="record.record" v-for="(record, index) in entities">
            <moduleForm
                :bindingForView="true"
                :dataToBind="dataToBind"
                :edit-mode="true"
                :formHeader="false"
                :on-create-callback="afterCreate"
                :on-edit-callback="afterEdit"
                :record="record.record"
                :recordId="record.id"
                :recordIndex="index"
                class="p-3 bg-white"
                v-if="!userSearch || (userSearch && record.record.toLowerCase().includes(userSearch.toLowerCase()))"></moduleForm>
        </div>

        <div class="row">
            <div class="col-12 text-right mb-2">
                <dg-button class="mr-2" text="" type="primary p-2" icon="el-icon-arrow-up" fieldSize="large" :click="scrollToTop"></dg-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import module from './../index.js'

    export default {
        components: {
            moduleForm: () => import('./../form/View'),
            pagination: () => import('@/components/pagination/View.vue'),
            appBoard: () => import('@/components/board/View.vue'),
        },
        data() {
            return {
                activeFieldsNames: [1],
                userSearch: null,
                records: [],
                module: {
                    ...module
                },
                editMode: false,
                dialogVisible: false,
                dataToBind: null,
                rowToEdit: null,
                currentPage: 1,
                pageCount: 1
            };
        },
        beforeMount() {
            this.getEntityRecords({id: this.openedEntity.id, page: this.currentPage})
        },
        computed: {
            ...mapState(module.info.fullName + '-state', ['openedEntity', 'pageChunkSize', 'entities']),            
        },
        methods: {
            scrollToTop () {
                document.body.scrollTop = 0;
                document.getElementById('content-main-container').scrollTop = 0;
            },
            getPagesCount () {
                return Math.ceil(this.openedEntity.records_counter / this.pageChunkSize)
            },
            navigateToPage (page) {
                this.getEntityRecords({id: this.openedEntity.id, page})
                this.currentPage = page
            },
            ...mapActions(module.info.fullName + '-api', ['getEntityRecords']),
            afterEdit(newEntity) {
                // DO NOT REMOVE THIS METHOD
            },
            afterCreate(newEntity) {
                this.dialogVisible = false;
            },
            createAction(params) {
                this.dialogVisible = true;
                this.editMode = false;
                this.dataToBind = null;
            }
        }
    }
</script>
