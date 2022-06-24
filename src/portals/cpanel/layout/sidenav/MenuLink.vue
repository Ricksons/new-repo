<template>
    <div v-if="hasMenu()">
        <div v-if="hasTopSeparator()" style="margin: 0px 0; border-top: 1px solid rgba(255,255,255, 0.2);width: 100%;"></div>
        <router-link :to="{name: module.info.routeName + '->' + module.sideMenu.routeName,  params: module.sideMenu.routeParams}" v-if="!hasSubLinks()">
            <el-menu-item :index="module.sideMenu.caption + '-' + module.sideMenu.caption">
                <i style="color: #fff;font-size: 12px" :class="module.sideMenu.icon"></i>
                <span style="font-size: 12px">{{module.sideMenu.caption}}</span>
            </el-menu-item>
        </router-link>
        <el-submenu :index="module.sideMenu.caption" v-else>
            <template slot="title">
                <i style="color: #fff;font-size: 12px" :class="module.sideMenu.icon"></i>
                <span class="title" style="font-size: 12px">{{module.sideMenu.caption}}</span>
            </template>

            <router-link :to="{name: module.info.routeName + '->' + subMenu.routeName, params: subMenu.routeParams}" v-for="(subMenu, subMenuKey) in menuChildren" :key="subMenuKey">
                <el-menu-item :index="subMenu.caption + '-' + module.sideMenu.caption">
                    <i style="color: #fff;font-size:12px" :class="subMenu.icon"></i>
                    <span slot="title" style="font-size: 12px">{{subMenu.caption}}</span>
                </el-menu-item>
            </router-link>
        </el-submenu>
    </div>
</template>

<script>
    export default {
        props: {
            module: {
                required: true
            },
        },
        data() {
            return {
                menuChildren: []
            }
        },
        methods: {
            hasSubLinks () {
                if (this.module.sideMenu.hasOwnProperty('children')) {
                    this.menuChildren = this.module.sideMenu.children
                    return true
                }
                return false
            },
            hasMenu () {
                return this.module.hasOwnProperty('sideMenu');
            },
            hasTopSeparator () {
                return this.module.sideMenu.hasOwnProperty('topSeparator') && this.module.sideMenu.topSeparator;
            },
        }
    }
</script>
