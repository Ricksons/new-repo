import { createRouter, createWebHistory } from 'vue-router'
import {checkRouteGuards} from '@/middleware/guards/main.js';
import {documentInfo} from '@/middleware/documentInfo.js';
import portalCpanelRoutes from '@/portals/cpanel/routes.js'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: () => import('@/system-services/views/About'),
      meta: {
        documentInfo: {
          pageTitle: "Page Title Here",
        },
        /*guards: {
          'auth': {}
        }*/
      }
    },
    ...portalCpanelRoutes,
  ]
})

router.beforeEach((to, from, next) => {
  documentInfo(to, from, next, (to.meta.hasOwnProperty('documentInfo'))? to.meta.documentInfo :  {})

  if (to.meta.hasOwnProperty('guards')) {
    checkRouteGuards(to, from, next, to.meta.guards)
  } else {
    next();
  }
});

export default router
