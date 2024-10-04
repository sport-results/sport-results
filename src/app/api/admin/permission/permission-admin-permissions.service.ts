import { Injectable } from '@angular/core';

import { ActionEnum } from '../../common/action';
import {
    PermissionPermissionsService,
    PermissionResourceEnum,
} from '../../domain/permission';

@Injectable()
export class PermissionAdminPermissionsService extends PermissionPermissionsService {
    public static readonly viewPermissionAdminPage =
        ActionEnum.VIEW.toString() +
        PermissionResourceEnum.PERMISSION_ADMIN_PAGE.toString();
    public static readonly viewPermissionEditPage =
        ActionEnum.VIEW.toString() +
        PermissionResourceEnum.PERMISSION_EDIT_PAGE.toString();
    public static readonly viewPermissionListPage =
        ActionEnum.VIEW.toString() +
        PermissionResourceEnum.PERMISSION_LIST_PAGE.toString();
}
