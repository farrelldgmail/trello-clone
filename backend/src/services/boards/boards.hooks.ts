const wait = (context:any) => new Promise<any>((resolve) => {
  setTimeout(() => { resolve(context); }, 500); // REM TODO DF 3000
});

// REM TODO DF Récupérer les modèles, se promener à travers les lists pour supprimer les tasks
// const deleteChildren = () => {
//   Lists.remove({ boardId: this._id }).exec();
// };
export default {
  before: {
    all: [wait],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
