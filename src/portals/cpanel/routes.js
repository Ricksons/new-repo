let namePrefix = 'portal-cpanel'
const routes =  [
  {
    path: '/cpanel',
    name: namePrefix,
    component: () => import('@/portals/cpanel/Main.vue'),
    redirect: {
      name: 'portal-cpanel-dashboard'
    },
    children: [
      {
        path: 'dashboard',
        name: namePrefix + '-dashboard',
        component: () => import('@/portals/cpanel/pages/Dashboard.vue'),
        meta: {
          /*guards: {
            'auth': {}
          }*/
        },
      }
    ]
  }
]

export default routes
