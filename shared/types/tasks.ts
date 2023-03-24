import { Id } from './commons';

export interface BaseModelInterface {
  _id?: Id;
}

export interface TaskInterface extends BaseModelInterface {
  name: string;
  listId?: Id;
}
