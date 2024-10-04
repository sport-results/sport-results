import { Injectable } from '@angular/core';
import { PermissionAdminPermissionsService } from '@app/api/admin/permission';
import { PermissionsService } from '@app/api/common';
import { PermissionPermissionsService } from '@app/api/domain/permission';

@Injectable()
export class AdminPermissionPermissionsService extends PermissionAdminPermissionsService {
    constructor() {
        super();

        PermissionsService.addPermissions({
            label: 'Permission Admin',
            items: [
                {
                    label: PermissionAdminPermissionsService.viewPermissionAdminPage,
                    value: PermissionAdminPermissionsService.viewPermissionAdminPage,
                },
                {
                    label: PermissionAdminPermissionsService.viewPermissionEditPage,
                    value: PermissionAdminPermissionsService.viewPermissionEditPage,
                },
                {
                    label: PermissionAdminPermissionsService.viewPermissionListPage,
                    value: PermissionAdminPermissionsService.viewPermissionListPage,
                },
            ],
        });

        PermissionsService.addPermissions({
            label: 'Permission',
            items: [
                {
                    label: PermissionPermissionsService.createPermissionEntity,
                    value: PermissionPermissionsService.createPermissionEntity,
                },
                {
                    label: PermissionPermissionsService.deletePermissionEntity,
                    value: PermissionPermissionsService.deletePermissionEntity,
                },
                {
                    label: PermissionPermissionsService.updatePermissionEntity,
                    value: PermissionPermissionsService.updatePermissionEntity,
                },
                {
                    label: PermissionPermissionsService.viewPermissionEntity,
                    value: PermissionPermissionsService.viewPermissionEntity,
                },
            ],
        });
    }
}
