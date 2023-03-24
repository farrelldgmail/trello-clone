import { Id } from './commons';

export interface BaseModelInterface {
  _id?: Id;
}

export interface ListInterface extends BaseModelInterface {
  name: string;
  color: string;
  boardId?: Id;
}
