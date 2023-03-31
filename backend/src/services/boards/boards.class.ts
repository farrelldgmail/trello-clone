import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '@/declarations';
import createApplication from '@feathersjs/feathers';

export class Boards extends Service {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  find(params?: createApplication.Params): Promise<any[] | createApplication.Paginated<any>> {
    return super.find(params);
  }
}
