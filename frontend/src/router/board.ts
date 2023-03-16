// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (lazyLoad) => ([
  {
    path: '/board',
    component: lazyLoad('features/Board/views/Boardlist.vue'),
  },
  {
    path: '/board/:boardId',
    props: true,
    component: lazyLoad('features/Board/views/Board.vue'),
  },
]);
