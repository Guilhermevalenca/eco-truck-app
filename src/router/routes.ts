import { RouteRecordRaw } from 'vue-router';
import { noLogged } from 'src/router/guards/authGuards';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: 'home'
      },
      {
        path: '/login',
        component: () => import('pages/LoginPage.vue'),
        name: 'login',
        beforeEnter: noLogged
      },
      {
        path: '/register',
        component: () => import('pages/RegisterPage.vue'),
        name: 'register',
        beforeEnter: noLogged
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
