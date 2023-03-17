// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (lazyLoad) => ([
  {
    name: 'boardList',
    path: '/board',
    component: lazyLoad('features/Board/views/Boardlist.vue'),
  },
  {
    name: 'boardDetail',
    path: '/board/:boardId',
    props: true,
    component: lazyLoad('features/Board/views/Board.vue'),
  },
]);
