import { User } from '../../common/user';
import { Entity } from '../../core/entity';

export type UserEntity = User & Entity & {
};

export type UserEntityAdd = Omit<UserEntity, 'uid'>;

export type UserEntityUpdate = Partial<UserEntity> & Entity;

export type UserModel = User & Entity & {
    roleIds?: string[];
};

export type UserModelAdd = Omit<UserModel, 'uid'>;

export type UserModelUpdate = Partial<UserModel> & Entity;

export const USER_FEATURE_KEY = 'user';

export enum UserResourceEnum {
    USER_ENTITY     = 'UserEntity',
    USER_ADMIN_PAGE = 'UserAdminPage',
    USER_EDIT_PAGE  = 'UserEditPage',
    USER_LIST_PAGE  = 'UserListPage',
}
