import { Injectable } from '@angular/core';
import { SportPlayerAdminPermissionsService } from '@app/api/admin/sport-player';
import { PermissionsService } from '@app/api/common';
import { SportPlayerPermissionsService } from '@app/api/domain/sport-player';

@Injectable()
export class AdminSportPlayerPermissionsService extends SportPlayerAdminPermissionsService {
    constructor() {
        super();

        PermissionsService.addPermissions({
            label: 'SportPlayer Admin',
            items: [
                {
                    label: SportPlayerAdminPermissionsService.viewSportPlayerAdminPage,
                    value: SportPlayerAdminPermissionsService.viewSportPlayerAdminPage,
                },
                {
                    label: SportPlayerAdminPermissionsService.viewSportPlayerEditPage,
                    value: SportPlayerAdminPermissionsService.viewSportPlayerEditPage,
                },
                {
                    label: SportPlayerAdminPermissionsService.viewSportPlayerListPage,
                    value: SportPlayerAdminPermissionsService.viewSportPlayerListPage,
                },
            ],
        });

        PermissionsService.addPermissions({
            label: 'SportPlayer',
            items: [
                {
                    label: SportPlayerPermissionsService.createSportPlayerEntity,
                    value: SportPlayerPermissionsService.createSportPlayerEntity,
                },
                {
                    label: SportPlayerPermissionsService.deleteSportPlayerEntity,
                    value: SportPlayerPermissionsService.deleteSportPlayerEntity,
                },
                {
                    label: SportPlayerPermissionsService.updateSportPlayerEntity,
                    value: SportPlayerPermissionsService.updateSportPlayerEntity,
                },
                {
                    label: SportPlayerPermissionsService.viewSportPlayerEntity,
                    value: SportPlayerPermissionsService.viewSportPlayerEntity,
                },
            ],
        });
    }
}
