import { SelectItemGroup } from 'primeng/api';

import { RoleNamesEnum } from '../role';

export abstract class PermissionsService {
    public static permissions: SelectItemGroup[] = [
        {
            label: 'App',
            items: [
                {
                    label: RoleNamesEnum.ADMIN,
                    value: RoleNamesEnum.ADMIN,
                },
            ],
        },
    ];

    public static addPermissions(permissions: SelectItemGroup): void {
        PermissionsService.permissions.push(permissions);
    }
}
