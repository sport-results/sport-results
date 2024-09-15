import { Injectable } from '@angular/core';
import { UserAdminPermissionsService } from '@app/api/admin/user';
import { PermissionsService } from '@app/api/common';
import { UserPermissionsService } from '@app/api/domain/user';

@Injectable()
export class AdminUserPermissionsService extends UserAdminPermissionsService {
    constructor() {
        super();

        PermissionsService.addPermissions({
            label: 'User Admin',
            items: [
                {
                    label: UserAdminPermissionsService.viewUserAdminPage,
                    value: UserAdminPermissionsService.viewUserAdminPage,
                },
                {
                    label: UserAdminPermissionsService.viewUserEditPage,
                    value: UserAdminPermissionsService.viewUserEditPage,
                },
                {
                    label: UserAdminPermissionsService.viewUserListPage,
                    value: UserAdminPermissionsService.viewUserListPage,
                },
            ],
        });

        PermissionsService.addPermissions({
            label: 'User',
            items: [
                {
                    label: UserPermissionsService.createUserEntity,
                    value: UserPermissionsService.createUserEntity,
                },
                {
                    label: UserPermissionsService.deleteUserEntity,
                    value: UserPermissionsService.deleteUserEntity,
                },
                {
                    label: UserPermissionsService.updateUserEntity,
                    value: UserPermissionsService.updateUserEntity,
                },
                {
                    label: UserPermissionsService.viewUserEntity,
                    value: UserPermissionsService.viewUserEntity,
                },
            ],
        });
    }
}
