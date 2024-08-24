import { RouteRecordRaw } from 'vue-router';
import { noLogged, logged } from 'src/router/guards/authGuards';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: 'home',
      },
      {
        path: '/login',
        component: () => import('pages/LoginPage.vue'),
        name: 'login',
        beforeEnter: noLogged,
      },
      {
        path: '/register',
        component: () => import('pages/RegisterPage.vue'),
        name: 'register',
        beforeEnter: noLogged,
      },
      {
        path: '/profile',
        component: () => import('pages/ProfilePage.vue'),
        name: 'profile',
        beforeEnter: logged,
      },
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
