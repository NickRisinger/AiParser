import {createRouter, createWebHashHistory} from 'vue-router';
import {LayoutsEnum} from '/@/layouts/types';
import {loadLayoutMiddleware} from './middleware/loadLayout';

enum RouteNamesEnum {
  index = 'index',
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
      ],
    },
  ],
});

router.beforeEach(loadLayoutMiddleware);

export default router;
