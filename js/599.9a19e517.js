"use strict";(self["webpackChunkcms"]=self["webpackChunkcms"]||[]).push([[599],{9599:function(e,o,r){r.r(o);var l=r(7869);const t={namespaced:!0,state:{usersProfiles:[{label:"Admin",value:"2"},{label:"Platform Employee",value:"4"},{label:"VoIP Reseller",value:"5"},{label:"VoIP Customer",value:"6"}],user_localstorage_key:"user",profile:{},token:null,isVerified:!1,afterLoginPath:"/dashboard",usersFusionServers:{},useLocalModules:!1,modules:{}},mutations:{SET_STATE(e,o){e[o.key]=o.value},ADD_MODULES(e,o){}},actions:{addModules({commit:e},o){e("ADD_MODULES",o)},setState({commit:e},o){e("SET_STATE",o)},async verifySavedProfile({state:e,dispatch:o},r){let t=(0,l.TA)(e.user_localstorage_key),s={token:t.token},a=await o("App-User-api/verify",s,{root:!0});await o("App-User-state/setProfileInfo",a,{root:!0});return a},setAfterLoginLocation({state:e},o){e.afterLoginPath=o.location},clearUserData({state:e,dispatch:o}){let r=e.profile;for(let l in r)delete r[l];localStorage.removeItem("ajax_manager_token"),localStorage.setItem("redirected_to_login","1"),localStorage.removeItem(e.user_localstorage_key)},setProfileInfo({state:e,dispatch:o},r){let t=e.profile;for(let l in r)t[l]=r[l];e.isVerified=!0,(0,l.lx)(e.user_localstorage_key,t)}},getters:{isAuthenticated:e=>e.isVerified,userHasModule:e=>o=>(0,l.TA)(e.user_localstorage_key)["modules"].hasOwnProperty(o),isProfileIdForReseller:e=>e=>!!e&&5==e,isProfileIdForPlatformEmployee:e=>e=>!!e&&4==e,isProfileIdForCustomer:e=>e=>!!e&&6==e,isProfileIdForMrt:e=>e=>!!e&&7==e,isUserRoot:e=>1==e.profile.profile_id,isUserReseller:e=>5==e.profile.profile_id,isUserPlatformEmployee:e=>4==e.profile.profile_id,isUserCustomer:e=>6==e.profile.profile_id,isUserMrt:e=>7==e.profile.profile_id}};o["default"]=t}}]);
//# sourceMappingURL=599.9a19e517.js.map