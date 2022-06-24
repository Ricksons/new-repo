export const module = {
  info: {
    fullName: 'App-Module',
    namespace: 'App',
    name: 'Module',
    caption: 'Module',
    routeName: 'module->App->Module',
    group: 'Root'
  },
  vuexModules: ['api', 'state'],
  mainRoute: '/cpanel',
  // noRoutes: true,
  sideMenu: {
    topSeparator: false,
    caption: 'Module',
    icon: 'el-icon-folder',
    routeName: 'list->page',
    routeParams: { listPage: 1}
    /*children: [
      {
        caption: 'Create Entity',
        icon: 'el-icon-plus',
        routeName: 'create'
      },
      {
        caption: 'List Entities',
        icon: 'el-icon-more-outline',
        routeName: 'list->page',
        routeParams: { listPage: 1}
      }
    ]*/
  }
}

export default module
