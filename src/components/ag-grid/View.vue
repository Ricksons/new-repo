<template>
    <ag-grid-vue
        :style="agGrid.agGridStyle"
        :class="agGrid.agGridClass"
        :gridOptions="agGrid.gridOptions"
        :columnDefs="agGrid.columnDefs"
        :rowData="rowData"
        :frameworkComponents="agGrid.frameworkComponents"
        :pagination="agGrid.pagination"
        :enableRtl="(agGrid.enableRtl)? true : false"
        :defaultColDef="{
            sortable: true,
            resizable: true,
            filter: true
        }"
        rowSelection="multiple"
        @grid-ready="onReady">
    </ag-grid-vue>
</template>

<script>
// full features of ag-grid
// https://github.com/ag-grid/ag-grid-vue-example/blob/master/src/rich-grid-example/RichGridExample.vue#L110
export default {
  watch: {
    'agGrid.rowData': function (val) {
      this.rowData = val
    }
  },
  props: {
    agGrid: {
      required: true
    }
  },
  data () {
    return {
      rowData: this.agGrid.rowData
    }
  },
  methods: {
    onReady (params) {
      this.agGrid.gridApi = params.api;
      this.agGrid.gridColumnApi = params.columnApi;
      this.agGrid.gridApi.sizeColumnsToFit()
    }
  }
}
</script>

<!--<style lang="css">
    @import "~ag-grid-community/dist/styles/ag-grid.css";
    @import "~ag-grid-community/dist/styles/ag-theme-bootstrap.min.css";
    @import "~ag-grid-community/dist/styles/ag-theme-material.min.css";
</style>-->
