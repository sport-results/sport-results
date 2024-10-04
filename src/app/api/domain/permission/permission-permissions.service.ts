import { ActionEnum } from '../../common';
import { PermissionResourceEnum } from './permission';

export abstract class PermissionPermissionsService {
    public static readonly createPermissionEntity =
        ActionEnum.CREATE.toString() + PermissionResourceEnum.PERMISSION_ENTITY.toString();
    public static readonly deletePermissionEntity =
        ActionEnum.DELETE.toString() + PermissionResourceEnum.PERMISSION_ENTITY.toString();
    public static readonly updatePermissionEntity =
        ActionEnum.UPDATE.toString() + PermissionResourceEnum.PERMISSION_ENTITY.toString();
    public static readonly viewPermissionEntity =
        ActionEnum.VIEW.toString() + PermissionResourceEnum.PERMISSION_ENTITY.toString();
}
