import { Id } from './commons';

export interface BaseModelInterface {
  _id?: Id;
}

export interface BoardInterface extends BaseModelInterface {
  name: string;
  backgroundUrl: string;
}
