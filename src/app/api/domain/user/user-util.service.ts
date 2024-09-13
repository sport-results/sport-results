import { EntityUtilService } from '../../core';
import {
    UserEntity,
    UserEntityAdd,
    UserEntityUpdate,
    UserModel,
    UserModelAdd,
    UserModelUpdate,
} from './user';

export abstract class UserUtilService extends EntityUtilService<
    UserEntity,
    UserEntityAdd,
    UserEntityUpdate,
    UserModel,
    UserModelAdd,
    UserModelUpdate
> {}
