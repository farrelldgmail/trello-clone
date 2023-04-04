import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Store from '../store';
import Home from './home';
import Auth from './auth';
import Board from './board';

Vue.use(VueRouter);

function lazyLoad(view) {
  return () => import(/* webpackChunkName: "[request]" */ `@/${view}`);
}

export const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: () => '/home',
  },
  ...Home(lazyLoad),
  ...Auth(lazyLoad),
  ...Board(lazyLoad),
  {
    path: '/404',
    name: 'NotFound',
    component: lazyLoad('features/Error/views/NotFound.vue'),
  },
  {
    path: '/401',
    name: 'Unauthenticated',
    component: lazyLoad('features/Error/views/Unauthenticated.vue'),
  },
] as RouteConfig[];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  // validate URL
  const link = router.resolve(to.path);
  if (link.resolved?.matched.length === 0) {
    next('/404');
    return;
  }

  if (!['/home', '/signup', '/login', '/404', '/401'].includes(to.path)) {
    try {
      await Store.dispatch('auth/authenticate');
    } catch (error) {
      console.log('401!!');
      next('/401');
      return;
    }
  }

  next();
});

export default router;
