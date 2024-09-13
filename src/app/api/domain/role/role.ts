import { Role } from '../../common/role';
import { Entity } from '../../core/entity';

export type RoleEntity = Role & Entity;

export type RoleEntityAdd = Omit<RoleEntity, 'uid'>;

export type RoleEntityUpdate = Partial<RoleEntity> & Entity;

export type RoleModel = Role & Entity;

export type RoleModelAdd = Omit<RoleModel, 'uid'>;

export type RoleModelUpdate = Partial<RoleModel> & Entity;

export enum RoleResourceEnum {
    ROLE_ENTITY = 'RoleEntity',
    ROLE_ADMIN_PAGE = 'RoleAdminPage',
    ROLE_EDIT_PAGE = 'RoleEditPage',
    ROLE_LIST_PAGE = 'RoleListPage',
}

export const ROLE_FEATURE_KEY = 'role';
