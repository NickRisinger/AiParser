import {createRouter, createWebHashHistory} from 'vue-router';
import {LayoutsEnum} from '/@/layouts/types';
import {loadLayoutMiddleware} from './middleware/loadLayout';

enum RouteNamesEnum {
  index = 'index',
  settings = 'settings',
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      meta: {
        layout: LayoutsEnum.default,
      },
      children: [
        {
          path: '',
          name: RouteNamesEnum.index,
          component: () => import('../pages/IndexPage.vue'),
        },
        {
          path: 'settings',
          name: RouteNamesEnum.settings,
          component: () => import('../pages/SettingsPage.vue'),
        },
      ],
    },
  ],
});

router.beforeEach(loadLayoutMiddleware);

export default router;
