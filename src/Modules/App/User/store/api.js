import {AFD, getLS} from 'devegram-javascript-util';

const baseUrl = '/xapi/individual/user';
const baseUrl2 = '/xapi/individual/UserModule';
const moduleAjaxService = 'AMS'
const userAPI = {
    namespaced: true,
    state: {
        version: 0.1,
        token: null,
        title: null
    },
    actions: {
        async verify(context, params) {
            let verifyAPI = {
                verb: 'post',
                service: 'AMS',
                url: baseUrl + '/verify',
                headers: {}
            };

            return new Promise((resolve, reject) => {
                context.dispatch('ajaxManager/api', verifyAPI, {root: true}).then((r) => {
                    context.dispatch('App-User-state/setProfileInfo', getLS('user'), {root: true}).then(() => {
                        resolve(r)
                    })
                }).catch(e => {
                    reject(e);
                });
                ;
            })
        },
        async changeLoggedInUserPassword(context, params) {
            let api = {
                verb: 'post',
                service: moduleAjaxService,
                url: baseUrl + '/changeLoggedInUserPassword',
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
        async updateLoggedInProfile(context, params) {
            let api = {
                verb: 'post',
                service: moduleAjaxService,
                url: baseUrl + '/updateLoggedInProfile',
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
        async update(context, params) {
            let api = {
                verb: 'post',
                service: moduleAjaxService,
                url: baseUrl + '/update/' + params.id,
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
        async login(context, params) {
            let fd = AFD({
                username: params.identityPassport,
                password: params.secret
            });

            return new Promise((resolve, reject) => {
                $store.dispatch('ajaxManager/api', {
                    service: 'AMS',
                    verb: 'post',
                    url: '/xapi/individual/user/login',
                    data: fd,
                    noToken: true
                }).then(r => {
                    context.dispatch('App-User-state/setProfileInfo', r.data, {root: true}).then(() => {
                        let userBackendModules = r.data.modules
                        let localModules = $store.state['App-User-state'].modules
                        let useLocalModules = $store.state['App-User-state'].useLocalModules
                        $hkms.loadNameSpacesModules((useLocalModules)? localModules : userBackendModules).then(() => {
                            context.dispatch('ajaxManager/setToken', {
                                token: r.data.token
                            }, {root: true}).then(() => {
                                resolve(true);
                            })
                        })
                    })
                }).catch(e => {
                    reject(e);
                });
            });
        }
    }
};

export default userAPI
