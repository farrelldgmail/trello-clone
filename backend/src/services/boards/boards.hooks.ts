const wait = (context:any) => new Promise<any>((resolve) => {
  setTimeout(() => { resolve(context); }, 500); // REM TODO DF 3000
});

const addPostedBy = (context:any) => {
  context.data.postedBy = context.params.user._id;
};

// REM TODO DF Récupérer les modèles, se promener à travers les lists pour supprimer les tasks
// const deleteChildren = () => {
//   Lists.remove({ boardId: this._id }).exec();
// };
export default {
  before: {
    all: [wait],
    find: [
      // REM TODO DF Ajouter user au query
    ],
    get: [
      // REM TODO DF Ajouter user au query
    ],
    create: [addPostedBy],
    update: [addPostedBy],
    patch: [addPostedBy],
    // remove: [deleteChildren] // REM TODO DF
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
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
