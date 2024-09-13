import { SelectItemGroup } from 'primeng/api';

import { RoleNames } from '../role';

export abstract class PermissionsService {
    public static permissions: SelectItemGroup[] = [
        {
            label: 'App',
            items: [
                {
                    label: RoleNames.ADMIN,
                    value: RoleNames.ADMIN,
                },
            ],
        },
    ];

    public static addPermissions(permissions: SelectItemGroup): void {
        PermissionsService.permissions.push(permissions);
    }
}
