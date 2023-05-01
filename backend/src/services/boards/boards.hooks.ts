import { fastJoin, ResolverMap } from 'feathers-hooks-common';
import { HookContext } from '@feathersjs/feathers';
import { BoardInterface } from '@/shared/types/boards';
import { Lists } from '../lists/lists.class';

const ownerResolver: ResolverMap<any> = {
  joins: {
    owner: () => async (board: BoardInterface, context:HookContext) => {
      // eslint-disable-next-line no-param-reassign
      board.owner = (await context.app.services.users.get(board.postedBy, {
        query: { $select: ['displayname', 'email'] }
      }));
      return board;
    }
  }
};

const query = {
  owner: true,
};

const wait = (context:any) => new Promise<any>((resolve) => {
  setTimeout(() => { resolve(context); }, 500); // REM TODO DF 3000
});

const addPostedBy = (context:any) => {
  // eslint-disable-next-line no-underscore-dangle
  context.data.postedBy = context.params.user._id;
};

const limitToCurrentUser = (context:any) => {
  // eslint-disable-next-line no-underscore-dangle
  context.params.query = { postedBy: context.params.user._id.toString() };
};

const getListService = async (context:any) => {
  return context.app.service('lists').create(Lists, {
    adapter: {
      multi: true
    }
  });
}
const deleteCascade = (context:any) => {
  // console.log(context.result._id.toString());
  // const listService = context.app.service('lists');
  // const listService = await getListService(context);

  // REM TODO DF Pas de await donc pas un service, mais une promesse
  // console.log(listService);

  // Ne fonctionne pas!
  // eslint-disable-next-line no-underscore-dangle
  // listService.remove(null, { query: { boardId: context.result._id.toString() } });
  // listService.remove(null, { query: { boardId: '643eb68819e214b114f643b3' } });
  // Fonctionne
  // listService.remove('643eb55704db1c341dd17cab', { });
};

export default {
  before: {
    all: [wait],
    find: [limitToCurrentUser],
    get: [limitToCurrentUser],
    create: [addPostedBy],
    update: [addPostedBy],
    patch: [addPostedBy],
    remove: []
  },

  after: {
    all: [fastJoin(ownerResolver, query)],
    // all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [deleteCascade]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
