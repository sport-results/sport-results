import { Injectable } from '@angular/core';
import { SportNetworkAdminPermissionsService } from '@app/api/admin/sport-network';
import { PermissionsService } from '@app/api/common';
import { SportNetworkPermissionsService } from '@app/api/domain/sport-network';

@Injectable()
export class AdminSportNetworkPermissionsService extends SportNetworkAdminPermissionsService {
    constructor() {
        super();

        PermissionsService.addPermissions({
            label: 'SportNetwork Admin',
            items: [
                {
                    label: SportNetworkAdminPermissionsService.viewSportNetworkAdminPage,
                    value: SportNetworkAdminPermissionsService.viewSportNetworkAdminPage,
                },
                {
                    label: SportNetworkAdminPermissionsService.viewSportNetworkEditPage,
                    value: SportNetworkAdminPermissionsService.viewSportNetworkEditPage,
                },
                {
                    label: SportNetworkAdminPermissionsService.viewSportNetworkListPage,
                    value: SportNetworkAdminPermissionsService.viewSportNetworkListPage,
                },
            ],
        });

        PermissionsService.addPermissions({
            label: 'SportNetwork',
            items: [
                {
                    label: SportNetworkPermissionsService.createSportNetworkEntity,
                    value: SportNetworkPermissionsService.createSportNetworkEntity,
                },
                {
                    label: SportNetworkPermissionsService.deleteSportNetworkEntity,
                    value: SportNetworkPermissionsService.deleteSportNetworkEntity,
                },
                {
                    label: SportNetworkPermissionsService.updateSportNetworkEntity,
                    value: SportNetworkPermissionsService.updateSportNetworkEntity,
                },
                {
                    label: SportNetworkPermissionsService.viewSportNetworkEntity,
                    value: SportNetworkPermissionsService.viewSportNetworkEntity,
                },
            ],
        });
    }
}
