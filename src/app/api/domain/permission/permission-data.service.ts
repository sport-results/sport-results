import { EntityDataService } from '../../core';
import { PermissionModel, PermissionModelAdd, PermissionModelUpdate } from './permission';

export abstract class PermissionDataService extends EntityDataService<
    PermissionModel,
    PermissionModelAdd,
    PermissionModelUpdate
> {}
