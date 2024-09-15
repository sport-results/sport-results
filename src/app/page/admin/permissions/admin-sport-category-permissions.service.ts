import { Injectable } from '@angular/core';
import { SportCategoryAdminPermissionsService } from '@app/api/admin/sport-category';
import { PermissionsService } from '@app/api/common';
import { SportCategoryPermissionsService } from '@app/api/domain/sport-category';

@Injectable()
export class AdminSportCategoryPermissionsService extends SportCategoryAdminPermissionsService {
    constructor() {
        super();

        PermissionsService.addPermissions({
            label: 'SportCategory Admin',
            items: [
                {
                    label: SportCategoryAdminPermissionsService.viewSportCategoryAdminPage,
                    value: SportCategoryAdminPermissionsService.viewSportCategoryAdminPage,
                },
                {
                    label: SportCategoryAdminPermissionsService.viewSportCategoryEditPage,
                    value: SportCategoryAdminPermissionsService.viewSportCategoryEditPage,
                },
                {
                    label: SportCategoryAdminPermissionsService.viewSportCategoryListPage,
                    value: SportCategoryAdminPermissionsService.viewSportCategoryListPage,
                },
            ],
        });

        PermissionsService.addPermissions({
            label: 'SportCategory',
            items: [
                {
                    label: SportCategoryPermissionsService.createSportCategoryEntity,
                    value: SportCategoryPermissionsService.createSportCategoryEntity,
                },
                {
                    label: SportCategoryPermissionsService.deleteSportCategoryEntity,
                    value: SportCategoryPermissionsService.deleteSportCategoryEntity,
                },
                {
                    label: SportCategoryPermissionsService.updateSportCategoryEntity,
                    value: SportCategoryPermissionsService.updateSportCategoryEntity,
                },
                {
                    label: SportCategoryPermissionsService.viewSportCategoryEntity,
                    value: SportCategoryPermissionsService.viewSportCategoryEntity,
                },
            ],
        });
    }
}
