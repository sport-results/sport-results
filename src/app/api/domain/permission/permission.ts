import { ActionEnum } from '@app/api/common';
import { Entity } from '../../core/entity';

export interface Permission {
  userId: string;
  actions: ActionEnum[];
  resourceId: string;
  resourceType: string;
}

export type PermissionEntity = Permission & Entity;

export type PermissionEntityAdd = Omit<PermissionEntity, 'uid'>;

export type PermissionEntityUpdate = Partial<PermissionEntity> & Entity;

export type PermissionModel = Permission & Entity;

export type PermissionModelAdd = Omit<PermissionModel, 'uid'>;

export type PermissionModelUpdate = Partial<PermissionModel> & Entity;

export const PERMISSION_FEATURE_KEY = 'permission';

export enum PermissionResourceEnum {
  PERMISSION_ENTITY = 'PermissionEntity',
  PERMISSION_ADMIN_PAGE = 'PermissionAdminPage',
  PERMISSION_EDIT_PAGE = 'PermissionEditPage',
  PERMISSION_LIST_PAGE = 'PermissionListPage',
}
