import { Injectable } from '@angular/core';
import { NetworkPlayerAdminPermissionsService } from '@app/api/admin/network-player';
import { PermissionsService } from '@app/api/common';
import { NetworkPlayerPermissionsService } from '@app/api/domain/network-player';

@Injectable()
export class AdminNetworkPlayerPermissionsService extends NetworkPlayerAdminPermissionsService {
    constructor() {
        super();

        PermissionsService.addPermissions({
            label: 'NetworkPlayer Admin',
            items: [
                {
                    label: NetworkPlayerAdminPermissionsService.viewNetworkPlayerAdminPage,
                    value: NetworkPlayerAdminPermissionsService.viewNetworkPlayerAdminPage,
                },
                {
                    label: NetworkPlayerAdminPermissionsService.viewNetworkPlayerEditPage,
                    value: NetworkPlayerAdminPermissionsService.viewNetworkPlayerEditPage,
                },
                {
                    label: NetworkPlayerAdminPermissionsService.viewNetworkPlayerListPage,
                    value: NetworkPlayerAdminPermissionsService.viewNetworkPlayerListPage,
                },
            ],
        });

        PermissionsService.addPermissions({
            label: 'NetworkPlayer',
            items: [
                {
                    label: NetworkPlayerPermissionsService.createNetworkPlayerEntity,
                    value: NetworkPlayerPermissionsService.createNetworkPlayerEntity,
                },
                {
                    label: NetworkPlayerPermissionsService.deleteNetworkPlayerEntity,
                    value: NetworkPlayerPermissionsService.deleteNetworkPlayerEntity,
                },
                {
                    label: NetworkPlayerPermissionsService.updateNetworkPlayerEntity,
                    value: NetworkPlayerPermissionsService.updateNetworkPlayerEntity,
                },
                {
                    label: NetworkPlayerPermissionsService.viewNetworkPlayerEntity,
                    value: NetworkPlayerPermissionsService.viewNetworkPlayerEntity,
                },
            ],
        });
    }
}
