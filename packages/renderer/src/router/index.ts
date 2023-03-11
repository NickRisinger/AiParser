import {createRouter, createWebHashHistory} from 'vue-router';
import {LayoutsEnum} from '/@/layouts/types';
import {loadLayoutMiddleware} from './middleware/loadLayout';

enum RouteNamesEnum {
  index = 'index',
  settings = 'settings',
  parserVk = 'parserVk',
  parserInst = 'parserInst',
  info = 'info',
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
        {
          path: 'parserVk',
          name: RouteNamesEnum.parserVk,
          component: () => import('../pages/ParserVkPage.vue'),
        },
        {
          path: 'parserInst',
          name: RouteNamesEnum.parserInst,
          component: () => import('../pages/ParserInstPage.vue'),
        },
        {
          path: 'info',
          name: RouteNamesEnum.info,
          component: () => import('../pages/InfoPage.vue'),
        },
      ],
    },
  ],
});

router.beforeEach(loadLayoutMiddleware);

export default router;
