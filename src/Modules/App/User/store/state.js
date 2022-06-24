import {setLS, getLS} from 'devegram-javascript-util';

const baseApiUrl = '/xapi/individual/user';
const state = {
    namespaced: true,
    state: {
        usersProfiles: [
            /*{
                'label': 'Root',
                'value': '1'
            },*/
            {
                'label': 'Admin',
                'value': '2'
            },
            {
                'label': 'Platform Employee',
                'value': '4'
            },
            {
                'label': 'VoIP Reseller',
                'value': '5'
            },
            {
                'label': 'VoIP Customer',
                'value': '6'
            }
        ],
        user_localstorage_key: 'user',
        profile: {},
        token: null,
        isVerified: false,
        afterLoginPath: '/dashboard',
        usersFusionServers: {},
        useLocalModules: false,
        modules: {
            /*email: {
                account: {
                    features:{}
                },
                mail: {
                    features:{}
                },
            },
            Ecommerce: {
                Brand: {
                }
            },*/
            /*App: [
                {
                    name: 'Module',
                    group_name: 'system-gears',
                    features: {}
                },
            ],
            Individual: [
                {
                    name: 'Profile',
                    group_name: 'other',
                },
                {
                    name: 'ProfileModule',
                    group_name: 'other',
                }
            ],*/
        }
    },
    mutations: {
        SET_STATE(state, params) {
            state[params.key] = params.value
        },
        ADD_MODULES(state, modules) {
            /* state.modules = {
                 ...state.modules,
                 ...modules
             }
             console.log('NEW MODULES', state.modules)*/
        },
    },
    actions: {
        addModules({commit}, modules) {
            commit('ADD_MODULES', modules)
        },
        setState({commit}, params) {
            commit('SET_STATE', params)
        },
        async verifySavedProfile({state, dispatch}, params) {
            let savedProfile = getLS(state.user_localstorage_key)
            let verifyAPI = {
                token: savedProfile.token
            };

            let r = await dispatch('App-User-api/verify', verifyAPI, {root: true});
            let a = await dispatch('App-User-state/setProfileInfo', r, {root: true})

            return r;
        },
        setAfterLoginLocation({state}, params) {
            state.afterLoginPath = params.location
        },
        clearUserData({state, dispatch}) {
            let profile = state.profile
            for (let x in profile) {
                delete profile[x]
            }

            /*state.modules = {}
            window.$hkms.modules = {}*/
            localStorage.removeItem('ajax_manager_token')
            localStorage.setItem('redirected_to_login', '1')
            localStorage.removeItem(state.user_localstorage_key)
        },
        setProfileInfo({state, dispatch}, params) {
            let profile = state.profile
            for (let x in params) {
                profile[x] = params[x];
            }
            state.isVerified = true
            setLS(state.user_localstorage_key, profile);
        },
    },

    getters: {
        isAuthenticated: state => {
            return state.isVerified;
        },
        userHasModule: (state) => (moduleName) => {
            return getLS(state.user_localstorage_key)['modules'].hasOwnProperty(moduleName)
        },
        isProfileIdForReseller: state => (id) => {
            if (id) {
                return id == 5
            }
            return false;
        },
        isProfileIdForPlatformEmployee: state => (id) => {
            if (id) {
                return id == 4
            }
            return false;
        },
        isProfileIdForCustomer: state => (id) => {
            if (id) {
                return id == 6
            }
            return false;
        },
        isProfileIdForMrt: state => (id) => {
            if (id) {
                return id == 7
            }
            return false;
        },
        isUserRoot: state => {
            return state.profile.profile_id == 1;
        },
        isUserReseller: state => {
            return state.profile.profile_id == 5;
        },
        isUserPlatformEmployee: state => {
            return state.profile.profile_id == 4;
        },
        isUserCustomer: state => {
            return state.profile.profile_id == 6;
        },
        isUserMrt: state => {
            return state.profile.profile_id == 7;
        },
    }
};

export default state
