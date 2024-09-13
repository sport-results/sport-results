import { Injectable } from '@angular/core';
import { ActionEnum, PermissionsService } from '@app/api/common';

import { AdminResourceEnum } from '../enum';

@Injectable()
export class AdminPermissionsService {
    public static viewAdminPage =
        ActionEnum.VIEW.toString() + AdminResourceEnum.ADMIN_PAGE.toString();

    constructor() {
        PermissionsService.addPermissions({
            label: 'Admin',
            items: [
                {
                    label: AdminPermissionsService.viewAdminPage,
                    value: AdminPermissionsService.viewAdminPage,
                },
            ],
        });
    }
}
