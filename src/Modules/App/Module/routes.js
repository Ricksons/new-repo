import module from './index'

let moduleRoute = module.info.routeName;
const routes = [
  {
    path: module.info.name,
    name: moduleRoute,
    component: () => import('./View.vue'),
    children: [
      {
        path: 'create',
        name: moduleRoute + '->create',
        component: () => import('./create/View'),
      },
      {
        path: 'list',
        name: moduleRoute + '->list',
        component: () => import('./list/View'),
        children: [
          {
            path: ':listPage',
            name: moduleRoute + '->list->page',
            component: () => import('./list/page/View'),
          }
        ]
      },
      {
        path: ':entityTitle',
        name: moduleRoute + '->view',
        component: () => import('./view/View.vue'),        
      }
    ]
  }
];

export default routes
