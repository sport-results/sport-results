import { Injectable } from '@angular/core';
import { SportCategoryRuleAdminPermissionsService } from '@app/api/admin/sport-category-rule';
import { PermissionsService } from '@app/api/common';
import { SportCategoryRulePermissionsService } from '@app/api/domain/sport-category-rule';

@Injectable()
export class AdminSportCategoryRulePermissionsService extends SportCategoryRuleAdminPermissionsService {
    constructor() {
        super();

        PermissionsService.addPermissions({
            label: 'SportCategoryRule Admin',
            items: [
                {
                    label: SportCategoryRuleAdminPermissionsService.viewSportCategoryRuleAdminPage,
                    value: SportCategoryRuleAdminPermissionsService.viewSportCategoryRuleAdminPage,
                },
                {
                    label: SportCategoryRuleAdminPermissionsService.viewSportCategoryRuleEditPage,
                    value: SportCategoryRuleAdminPermissionsService.viewSportCategoryRuleEditPage,
                },
                {
                    label: SportCategoryRuleAdminPermissionsService.viewSportCategoryRuleListPage,
                    value: SportCategoryRuleAdminPermissionsService.viewSportCategoryRuleListPage,
                },
            ],
        });

        PermissionsService.addPermissions({
            label: 'SportCategoryRule',
            items: [
                {
                    label: SportCategoryRulePermissionsService.createSportCategoryRuleEntity,
                    value: SportCategoryRulePermissionsService.createSportCategoryRuleEntity,
                },
                {
                    label: SportCategoryRulePermissionsService.deleteSportCategoryRuleEntity,
                    value: SportCategoryRulePermissionsService.deleteSportCategoryRuleEntity,
                },
                {
                    label: SportCategoryRulePermissionsService.updateSportCategoryRuleEntity,
                    value: SportCategoryRulePermissionsService.updateSportCategoryRuleEntity,
                },
                {
                    label: SportCategoryRulePermissionsService.viewSportCategoryRuleEntity,
                    value: SportCategoryRulePermissionsService.viewSportCategoryRuleEntity,
                },
            ],
        });
    }
}
