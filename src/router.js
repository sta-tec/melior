import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'BooksCatalog',
      component: () => import('@/views/BooksCatalog'),
    },
    {
      path: '/book/create',
      name: 'BookPage',
      component: () => import('@/views/BookPage'),
    },
    {
      path: '/book/:id',
      name: 'BookPage',
      component: () => import('@/views/BookPage'),
    },
  ],
});
