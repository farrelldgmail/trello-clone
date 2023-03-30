const wait = (context:any) => new Promise<any>((resolve) => {
  setTimeout(() => { resolve(context); }, 500); // REM TODO DF 3000
});

const addPostedBy = (context:any) => {
  // eslint-disable-next-line no-underscore-dangle
  context.data.postedBy = context.params.user._id;
};

const limitToCurrentUser = (context:any) => {
  // REM TODO DF
  // eslint-disable-next-line no-underscore-dangle
  context.params.query = { postedBy: context.params.user._id.toString() };
  // return context;
};

// REM TODO DF Récupérer les modèles, se promener à travers les lists pour supprimer les tasks
// const deleteChildren = () => {
//   Lists.remove({ boardId: this._id }).exec();
// };
export default {
  before: {
    all: [wait],
    find: [limitToCurrentUser],
    get: [limitToCurrentUser],
    create: [addPostedBy],
    update: [addPostedBy],
    patch: [addPostedBy],
    // remove: [deleteChildren] // REM TODO DF
    // remove: [authHooks.queryWithCurrentUser({ idField: '_id', as: 'postedBy' })],
    // remove: [authHooks.restrictToOwner({ idField: '_id', ownerField: 'postedBy' })],
    remove: []
  },

  after: {
    all: [],
    find: [limitToCurrentUser],
    get: [limitToCurrentUser],
    create: [],
    update: [],
    patch: [],
    remove: []
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
