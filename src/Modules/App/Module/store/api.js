import {AFD} from 'devegram-javascript-util'
const baseUrl = '/xapi/App/Module';
const moduleAjaxService = 'AMS'
const api = {
    namespaced: true,
    state: {
        dropDownList: []
    },
    actions: {
    	/* CRUD APIs */

        async create(context, params) {
            let api = {
                verb: 'post',
                service: moduleAjaxService,
                url: baseUrl + '/store',
                data: AFD(params.data)
            };

            return new Promise((resolve, reject) => {
                context.dispatch('ajaxManager/api', api, {root: true}).then(r => {
                    context.state.dropDownList.push({value: r.data.id, label: r.data.id})
                    resolve(r);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        async update(context, params) {
            let api = {
                verb: 'post',
                service: moduleAjaxService,
                url: baseUrl + '/update/' + params.id,
                data: AFD(params.data),
                noLoadingScreen: true
            };

            return new Promise((resolve, reject) => {
                context.dispatch('ajaxManager/api', api, {root: true}).then(r => {
                    context.state.dropDownList = []
                    resolve(r);
                }).catch(e => {
                    reject(e);
                });
            })
        },
        async remove(context, params) {
            let api = {
                verb: 'post',
                service: moduleAjaxService,
                url: baseUrl + '/remove/' + params.id
            };

            return new Promise((resolve, reject) => {
                context.dispatch('ajaxManager/api', api, {root: true}).then(r => {
                    context.state.dropDownList = []
                    resolve(r);
                }).catch(e => {
                    reject(e);
                });
            })
        },
        async get(context, params) {
            let api = {
                verb: 'get',
                service: moduleAjaxService,
                url: baseUrl + '/get/' + params.id
            };

            return new Promise((resolve, reject) => {
                context.dispatch('ajaxManager/api', api, {root: true}).then(r => {
                    resolve(r.data);
                }).catch(e => {
                    reject(e);
                });
            })
        },
        async list(context, params) {
            let page = (params.page) ? params.page : 1
            let search = (params.hasOwnProperty('search'))? "&search=" + encodeURIComponent(params.search) : ''
            let api = {
                verb: 'get',
                service: moduleAjaxService,
                url: baseUrl + '/list?page=' + page + search,
                data: null
            };

            return new Promise((resolve, reject) => {
                context.dispatch('ajaxManager/api', api, {root: true}).then(r => {
                    resolve(r.data);
                }).catch(e => {
                    reject(e);
                });
            })
        },
        async getDropDownList (context, params = {}) {
            if (context.state.dropDownList.length) {
                return context.state.dropDownList
            }

        	let query = ''
            if (params.hasOwnProperty('valueKey')) {
                query = '?value_key=' + params.valueKey
            }
            let api = {
                verb: 'get',
                service: moduleAjaxService,
                url: baseUrl + '/dropDownList' + query,
                data: null
            };

            return new Promise((resolve, reject) => {
                context.dispatch('ajaxManager/api', api, { root: true }).then(r => {
                    context.state.dropDownList = r.data
                    resolve(r.data);
                }).catch(e => {
                    reject(e);
                });
            })
        },

        /* Images APIs */

        async updateImage(context, params) {
            let api = {
                verb: 'post',
                service: moduleAjaxService,
                url: baseUrl + '/updateImage/' + params.id,
                data: AFD(params.data)
            };

            return new Promise((resolve, reject) => {
                context.dispatch('ajaxManager/api', api, {root: true}).then(r => {
                    resolve(r);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        async updateGallery(context, params) {
            let api = {
                verb: 'post',
                service: moduleAjaxService,
                url: baseUrl + '/galleryImage/' + params.id,
                data: AFD(params.data)
            };

            return new Promise((resolve, reject) => {
                context.dispatch('ajaxManager/api', api, {root: true}).then(r => {
                    resolve(r);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        async removeGalleryImage(context, params) {
            let api = {
                verb: 'delete',
                service: moduleAjaxService,
                url: baseUrl + '/galleryImage/' + params.id + '/' + params.parentId + '/' + params.fileId,
                data: AFD(params.data)
            };

            return new Promise((resolve, reject) => {
                context.dispatch('ajaxManager/api', api, {root: true}).then(r => {
                    resolve(r);
                }).catch(e => {
                    reject(e);
                })
            })
        },
    }

};

export default api
