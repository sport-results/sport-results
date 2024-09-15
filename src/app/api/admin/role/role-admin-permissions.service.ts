import { Injectable } from '@angular/core';
import { ActionEnum } from '@app/api/common';
import { RolePermissionsService, RoleResourceEnum } from '@app/api/domain/role';

@Injectable()
export class RoleAdminPermissionsService extends RolePermissionsService {
    public static readonly viewRoleAdminPage =
        ActionEnum.VIEW.toString() +
        RoleResourceEnum.ROLE_ADMIN_PAGE.toString();
    public static readonly viewRoleEditPage =
        ActionEnum.VIEW.toString() + RoleResourceEnum.ROLE_EDIT_PAGE.toString();
    public static readonly viewRoleListPage =
        ActionEnum.VIEW.toString() + RoleResourceEnum.ROLE_LIST_PAGE.toString();
}
