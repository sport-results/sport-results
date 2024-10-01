import { EntityUtilService } from '../../core';
import {
    PermissionEntity,
    PermissionEntityAdd,
    PermissionEntityUpdate,
    PermissionModel,
    PermissionModelAdd,
    PermissionModelUpdate
} from './permission';

export abstract class PermissionUtilService extends EntityUtilService<
    PermissionEntity,
    PermissionEntityAdd,
    PermissionEntityUpdate,
    PermissionModel,
    PermissionModelAdd,
    PermissionModelUpdate
> {}
