"use strict";(self["webpackChunkcms"]=self["webpackChunkcms"]||[]).push([[905],{5905:function(e,t,s){s.r(t);const a={namespaced:!0,state:{isCollapsed:!1,activeSubMenus:{},activeLink:"",currentActiveSection:""},actions:{update(e,t){e.commit("UPDATE",t)},updateCollapsed(e,t){e.commit("UPDATE_COLLAPSED",t)},updateActiveMenus(e,t){e.commit("UPDATE_ACTIVE_MENUS",t)}},mutations:{UPDATE(e,t){for(let s in t)e[s]=t[s]},UPDATE_ACTIVE_MENUS(e,t){"add"==t.action?e.activeSubMenus[t.key]=t.key:"remove"==t.action&&delete e.activeSubMenus[t.key]},UPDATE_COLLAPSED(e,t){e.isCollapsed=t.isCollapsed}},getters:{activeSubMenus:e=>Object.values(e.activeSubMenus)}};t["default"]=a}}]);
//# sourceMappingURL=905.ede8e657.js.map