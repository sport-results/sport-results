import { Injectable } from '@angular/core';
import { RoleAdminPermissionsService } from '@app/api/admin/role';
import { PermissionsService } from '@app/api/common';
import { RolePermissionsService } from '@app/api/domain/role';

@Injectable()
export class AdminRolePermissionsService extends RoleAdminPermissionsService {
    constructor() {
        super();

        PermissionsService.addPermissions({
            label: 'Role Admin',
            items: [
                {
                    label: RoleAdminPermissionsService.viewRoleAdminPage,
                    value: RoleAdminPermissionsService.viewRoleAdminPage,
                },
                {
                    label: RoleAdminPermissionsService.viewRoleEditPage,
                    value: RoleAdminPermissionsService.viewRoleEditPage,
                },
                {
                    label: RoleAdminPermissionsService.viewRoleListPage,
                    value: RoleAdminPermissionsService.viewRoleListPage,
                },
            ],
        });

        PermissionsService.addPermissions({
            label: 'Role',
            items: [
                {
                    label: RolePermissionsService.createRoleEntity,
                    value: RolePermissionsService.createRoleEntity,
                },
                {
                    label: RolePermissionsService.deleteRoleEntity,
                    value: RolePermissionsService.deleteRoleEntity,
                },
                {
                    label: RolePermissionsService.updateRoleEntity,
                    value: RolePermissionsService.updateRoleEntity,
                },
                {
                    label: RolePermissionsService.viewRoleEntity,
                    value: RolePermissionsService.viewRoleEntity,
                },
            ],
        });
    }
}
