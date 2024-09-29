import { Injectable } from '@angular/core';
import { SportEventAdminPermissionsService } from '@app/api/admin/sport-event';
import { PermissionsService } from '@app/api/common';
import { SportEventPermissionsService } from '@app/api/domain/sport-event';

@Injectable()
export class AdminSportEventPermissionsService extends SportEventAdminPermissionsService {
    constructor() {
        super();

        PermissionsService.addPermissions({
            label: 'SportEvent Admin',
            items: [
                {
                    label: SportEventAdminPermissionsService.viewSportEventAdminPage,
                    value: SportEventAdminPermissionsService.viewSportEventAdminPage,
                },
                {
                    label: SportEventAdminPermissionsService.viewSportEventEditPage,
                    value: SportEventAdminPermissionsService.viewSportEventEditPage,
                },
                {
                    label: SportEventAdminPermissionsService.viewSportEventListPage,
                    value: SportEventAdminPermissionsService.viewSportEventListPage,
                },
            ],
        });

        PermissionsService.addPermissions({
            label: 'SportEvent',
            items: [
                {
                    label: SportEventPermissionsService.createSportEventEntity,
                    value: SportEventPermissionsService.createSportEventEntity,
                },
                {
                    label: SportEventPermissionsService.deleteSportEventEntity,
                    value: SportEventPermissionsService.deleteSportEventEntity,
                },
                {
                    label: SportEventPermissionsService.updateSportEventEntity,
                    value: SportEventPermissionsService.updateSportEventEntity,
                },
                {
                    label: SportEventPermissionsService.viewSportEventEntity,
                    value: SportEventPermissionsService.viewSportEventEntity,
                },
            ],
        });
    }
}
