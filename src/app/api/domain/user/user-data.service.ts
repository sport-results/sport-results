import { EntityDataService } from '../../core';
import {
    UserModel,
    UserModelAdd,
    UserModelUpdate,
} from './user';

export abstract class UserDataService extends EntityDataService<
    UserModel,
    UserModelAdd,
    UserModelUpdate
> {}
