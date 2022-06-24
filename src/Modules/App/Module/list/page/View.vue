<template>
  <module-list-layout :createAction="createAction" :module="module" class="p-2" v-if="amReady">
    <el-dialog :visible.sync="dialogVisible" title="" top="5vh" width="75%">
      <moduleForm
          :autoBind="false"
          :bindingForView="true"
          :dataToBind="dataToBind"
          :edit-mode="editMode"
          :formHeader="true"
          :formTitle="((editMode)? 'Update ' : 'Create ') + module.info.caption"
          :moduleDeleteAction='moduleFormDeleteAction'
          :on-create-callback="afterCreate"
          :on-edit-callback="afterEdit"
          v-if="dialogVisible"></moduleForm>
    </el-dialog>

    <div class="row pl-3 pr-3">
      <div class="col-12 col-md-6 pt-1">
        <dg-text-field
            :field_span="19"
            :label_span="24"
            :liveUpdate="true"
            @amUpdated="userSearchUpdated"
            field_mark=""
            placeholder="search here"></dg-text-field>
      </div>
      <div class="col-12 col-md-6  pt-1">
        <pagination
            :currentPage="currentPage"
            :margin-pages="2"
            :navigateHandler="navigateToPage"
            :page-count="getPagesCount()"
            :page-range="4"
            paginateClass=""></pagination>
      </div>
    </div>

    <app-ag-grid :agGrid="agGrid"></app-ag-grid>

    <el-dialog :visible.sync="deleteDialogVisible" center title="Warning" width="420px">
      <div align="center" class="mt-2 mb-2">You want to remove this record ?</div>
      <span class="dialog-footer" slot="footer">
        <el-button @click="deleteDialogVisible = false" size="small">Cancel</el-button>
        <el-button @click="removeActionApi" size="small" type="danger">Yes</el-button>
      </span>
    </el-dialog>
  </module-list-layout>
</template>

<script>
import vue from 'vue'
import actionsCell from './ag-grid/ActionsCell'
import toggleCell from './ag-grid/Toggle'
import module from './../../index.js'
import editOnFlyCell from "@/components/ag-grid-edit-on-fly-cell/View";
import {mapActions} from "vuex";

export default {
  components: {
    pagination: () => import('@/components/pagination/View.vue'),
    moduleForm: () => import('../../form/View'),
    moduleListLayout: () => import('@/modules-config/layouts/list/View.vue')
  },
  data() {
    return {
      deleteDialogVisible: false,
      targetParams: null,
      userSearch: '',
      userSearchTimeOut: null,
      amReady: false,
      module: {
        ...module
      },
      currentPage: 1,
      pageChunkSize: 12,
      pageCount: 1,
      editMode: false,
      dialogVisible: false,
      recordsCounter: 0,
      dataToBind: null,
      rowToEdit: null,
      agGrid: {
        pagination: false,
        enableRtl: $langConfig.dir == 'rtl',
        agGridStyle: 'width: 100%; height: 650px; padding: 0',
        agGridClass: 'ag-theme-material',
        gridOptions: {
          suppressCellSelection: true,
          onGridReady: function (params) {
            params.api.sizeColumnsToFit()
          }
        },
        columnDefs: [
          {
            field: 'namespace',
            headerName: 'Namespace',
            headerClass: $langConfig.lang + '-lang-text text-capitalize',
            autoHeight: true,
            suppressKeyboardEvent: (params) => {
              return true
            },
            cellRendererFramework: vue.extend(editOnFlyCell),
            cellRendererParams: {
              props: {
                inputWidth: '180px',
                valuePropertyName: 'namespace',
                saveAction: this.updateField,
                editContainerStyle: 'top: 0px;'
              }
            }
            /*,cellRenderer: (params) => {
              return params.data.system_profit_percent  + '%';
            }*/
          },
          {
            field: 'name',
            headerName: 'Name',
            headerClass: $langConfig.lang + '-lang-text',
          },
          {
            field: 'group_name',
            headerName: 'Group Name',
            headerClass: $langConfig.lang + '-lang-text',
          },
          {
            field: 'caption',
            headerName: 'Caption',
            headerClass: $langConfig.lang + '-lang-text text-capitalize',
          },
          {
            width: 100,
            field: 'used_by_root',
            headerName: 'Used by Root',
            headerClass: $langConfig.lang + '-lang-text text-capitalize',
            autoHeight: true,
            cellRendererFramework: vue.extend(toggleCell),
            cellRendererParams: {
              props: {
                actionsHandler: this.actionsHandler
              }
            }
          },
          /*{
            field: 'date',
            headerName: 'Date',
            headerClass: $langConfig.lang + '-lang-text text-capitalize',
            cellRenderer: (params) => {
              let span = document.createElement('span')
              span.style.color = params.color
              span.innerText = params.data.created_at
              return span
            },
            cellRendererParams: {
              color: 'orange'
            }
          },*/
          {
            width: 80,
            headerName: this.$ml.get('actions'),
            headerClass: $langConfig.lang + '-lang-text text-capitalize',
            cellRendererFramework: vue.extend(actionsCell),
            cellRendererParams: {
              props: {
                actionsHandler: this.actionsHandler
              }
            }
          }
        ],
        rowData: []
      }
    };
  },
  beforeMount() {
    this.currentPage = parseInt(this.$route.params.listPage)
    this.getEntityListData(this.currentPage)
  },
  methods: {
    updateField(agGridParams, newValue, afterSave, fieldName) {
      let data = {}
      data[fieldName] = newValue

      let apiParams = {
        id: agGridParams.data.id,
        data
      }

      this.updateModule(apiParams).then(r => {
        afterSave()
      })
    },
    setUsedByRoot(params) {
      let apiParams = {
        id: params.module_id,
        data: {
          used_by_root: (params.value)? 1 : 0
        }
      }

      this.updateModule(apiParams)
    },
    getEntityListData(page) {
      this.getEntityList({page: page, search: this.userSearch}).then(response => {
        this.buildAgGridData(response)
      })
      this.currentPage = page
    },
    buildAgGridData(response) {
      this.agGrid.rowData = response.rows
      this.recordsCounter = response.count
      this.amReady = true
    },
    userSearchUpdated(field) {
      // this.agGrid.gridApi.setQuickFilter(val);
      let val = field.field.field_value
      this.userSearch = val
      clearTimeout(this.userSearchTimeOut)
      this.userSearchTimeOut = setTimeout(() => {
        this.getEntityListData(1) //this.agGrid.gridApi.setQuickFilter(val);
      }, 200)
    },
    ...mapActions(module.info.fullName + '-api', {
      getEntityList: 'list',
      updateModule: 'update'
    }),
    scrollToTop() {
      document.body.scrollTop = 0;
      document.getElementById('content-main-container').scrollTop = 0;
    },
    getPagesCount() {
      return Math.ceil(this.recordsCounter / this.pageChunkSize)
    },
    navigateToPage(page) {
      $router.push({name: this.module.info.routeName + '->list->page', params: {listPage: page}})
      /*this.getEntityList({page: page, search: this.userSearch}).then(response => {
        this.buildAgGridData(response)
      })*/
    },
    refreshGrid() {
      this.agGrid.gridOptions.api.setRowData(this.agGrid.rowData)
    },
    afterEdit(updatedData, propertyName = false, closeDialog = true) {
      // getting a rowNode by index
      // this.agGrid.gridApi.getDisplayedRowAtIndex(0).setData({})

      if (propertyName) {
        this.agGrid.rowData[this.rowToEdit][propertyName] = updatedData;
      } else {
        this.agGrid.rowData[this.rowToEdit] = updatedData;
      }

      if (closeDialog) this.dialogVisible = false;
      this.refreshGrid();
    },
    moduleFormDeleteAction() {
      this.removeAction({
        data: this.dataToBind,
        rowIndex: this.rowToEdit
      })
      this.dialogVisible = false;
    },
    afterCreate(newEntity) {
      this.agGrid.rowData.push(newEntity);
      this.dialogVisible = false;
      this.refreshGrid();
    },
    createAction(params) {
      this.dialogVisible = true;
      this.editMode = false;
      this.dataToBind = null;
      this.rowToEdit = null;
      // this.$router.push({ name: this.module.info.routeName + '->view', params: { id: params.data.id}})
    },
    editAction(params) {
      this.dialogVisible = true;
      this.editMode = true;
      this.dataToBind = params.data;
      this.rowToEdit = params.rowIndex;
    },
    removeAction(params) {
      this.targetParams = params
      this.deleteDialogVisible = true
    },
    removeActionApi() {
      let params = this.targetParams
      this.deleteDialogVisible = false
      this.$store.dispatch(this.module.info.fullName + '-api/remove', {id: params.data.id}).then(response => {
        this.agGrid.rowData.splice(params.rowIndex, 1);
        this.refreshGrid();
        this.recordsCounter -= 1;
        $notify.view({
          type: 'success',
          title: this.$ml.get('deleted'),
        });
      })
    },
    actionsHandler(command, params) {
      this[command](params)
    }
  }
}
</script>
