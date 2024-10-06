import { Permission } from '@app/api/common';

import { Entity } from '../../core/entity';

export type PermissionEntity = Permission & Entity;
export type PermissionEntityAdd = Omit<PermissionEntity, 'uid'>;
export type PermissionEntityUpdate = Partial<PermissionEntity> & Entity;
export type PermissionModel = Permission & Entity;
export type PermissionModelAdd = Omit<PermissionModel, 'uid'>;
export type PermissionModelUpdate = Partial<PermissionModel> & Entity;

export enum PermissionResourceEnum {
  PERMISSION_ENTITY = 'PermissionEntity',
  PERMISSION_ADMIN_PAGE = 'PermissionAdminPage',
  PERMISSION_EDIT_PAGE = 'PermissionEditPage',
  PERMISSION_LIST_PAGE = 'PermissionListPage',
}

export const PERMISSION_FEATURE_KEY = 'permission';
