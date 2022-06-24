<template>
    <div>
        <span class="d-inline-block">
            <paginate
                :class="paginateClass"
                v-model="currentPage"
                :page-count="pageCount"
                :page-range="pageRange"
                :margin-pages="marginPages"
                :click-handler="navigateHandler"
                :prev-text="prevText"
                :next-text="nextText"
                container-class="pagination"
                page-class="page-item"
                page-link-class="page-link"
                prev-class="page-item"
                prev-link-class="page-link"
                next-class="page-item"
                next-link-class="page-link">
        </paginate>
        </span>
        <div v-if="customPage" class="ml-2 d-inline">
            <span>
                <input
                    type="text"
                    style="width: 50px;text-align: center;padding: 1px 0; padding-bottom: 3px;"
                    class="form-control d-inline-block"
                    :class="userCustomPageClass"
                    v-model="userCustomPage"/>
            </span>
            <span class="ml-2" style="position: relative;top: -2px">
                <button type="button" class="btn border-secondary" style="font-size: 11px;padding: 5px 10px;position: relative;top: 1px;" @click="goToUserCustomPage">Go</button>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            currentPage: {
                required: true
            },
            customPage: {
              required: false,
              default: true
            },
            navigateHandler: {
                required: true
            },
            pageCount: {
                required: true
            },
            pageRange: {
                required: false,
                default: 4
            },
            marginPages: {
                required: false,
                default: 2
            },
            prevText: {
                required: false,
                default: 'Prev'
            },
            nextText: {
                required: false,
                default: 'Next'
            },
            paginateClass: {
                required: false,
                default: 'mt-2'
            }
        },
        data () {
            return {
                userCustomPage: null,
                userCustomPageClass: ''
            }
        },
        methods: {
            goToUserCustomPage () {
                let p = this.userCustomPage
                if (isNaN(p) || !p || p > this.pageCount) {
                    this.userCustomPageClass = 'border-danger'
                } else {
                    this.userCustomPageClass = ''
                    this.navigateHandler(p)
                }
            }
        }
    }
</script>

<style>
  .pagination {
    font-size: 11px;
  }
</style>
