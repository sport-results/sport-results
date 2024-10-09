import { Injectable } from '@angular/core';
import { SportResultAdminPermissionsService } from '@app/api/admin/sport-result';
import { PermissionsService } from '@app/api/common';
import { SportResultPermissionsService } from '@app/api/domain/sport-result';

@Injectable()
export class AdminSportResultPermissionsService extends SportResultAdminPermissionsService {
    constructor() {
        super();

        PermissionsService.addPermissions({
            label: 'SportResult Admin',
            items: [
                {
                    label: SportResultAdminPermissionsService.viewSportResultAdminPage,
                    value: SportResultAdminPermissionsService.viewSportResultAdminPage,
                },
                {
                    label: SportResultAdminPermissionsService.viewSportResultEditPage,
                    value: SportResultAdminPermissionsService.viewSportResultEditPage,
                },
                {
                    label: SportResultAdminPermissionsService.viewSportResultListPage,
                    value: SportResultAdminPermissionsService.viewSportResultListPage,
                },
            ],
        });

        PermissionsService.addPermissions({
            label: 'SportResult',
            items: [
                {
                    label: SportResultPermissionsService.createSportResultEntity,
                    value: SportResultPermissionsService.createSportResultEntity,
                },
                {
                    label: SportResultPermissionsService.deleteSportResultEntity,
                    value: SportResultPermissionsService.deleteSportResultEntity,
                },
                {
                    label: SportResultPermissionsService.updateSportResultEntity,
                    value: SportResultPermissionsService.updateSportResultEntity,
                },
                {
                    label: SportResultPermissionsService.viewSportResultEntity,
                    value: SportResultPermissionsService.viewSportResultEntity,
                },
            ],
        });
    }
}
