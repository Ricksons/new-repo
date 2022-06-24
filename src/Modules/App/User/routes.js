import module from './index'

let moduleName = 'module->' + module.info.name;
const routes = [
    {
        path: module.info.name,
        name: moduleName,
        component: () => import('./View.vue'),
        children: [
            {
                path: 'logout',
                name: moduleName + '->logout',
                component: () => import('./logout/View'),
            },
            {
                path: 'create',
                name: moduleName + '->create',
                component: () => import('./create/View'),
            },
            {
                path: 'list',
                name: moduleName + '->list',
                component: () => import('./list/View'),
                children: [
                    {
                        path: ':listPage',
                        name: moduleName + '->list->page',
                        component: () => import('./list/page/View'),
                    }
                ]
            },
            {
                path: 'active',
                name: moduleName + '->active',
                component: () => import('./active/View.vue'),
                children: [
                    {
                        path: 'profile',
                        name: moduleName + '->active->profile',
                        component: () => import('./profile/View.vue')
                    },
                ]
            },
            /*{
              path: ':username',
              name: moduleName + '->view',
              component: () => import('./view/View.vue'),
              children: [
                {
                  path: 'records',
                  name: moduleName + '->view->records',
                  component: () => import('./view/records/View.vue')
                },
              ]
            }*/
        ]
    }
];

export default routes
