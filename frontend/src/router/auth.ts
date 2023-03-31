// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (lazyLoad) => ([
  {
    path: '/login',
    name: 'Login',
    component: lazyLoad('features/Auth/views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: lazyLoad('features/Auth/views/Signup.vue'),
  }
]);
