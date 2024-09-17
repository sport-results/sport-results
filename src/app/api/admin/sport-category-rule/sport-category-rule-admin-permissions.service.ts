import { Injectable } from '@angular/core';

import { ActionEnum } from '../../common/action';
import {
    SportCategoryRulePermissionsService,
    SportCategoryRuleResourceEnum,
} from '../../domain/sport-category-rule';

@Injectable()
export class SportCategoryRuleAdminPermissionsService extends SportCategoryRulePermissionsService {
    public static readonly viewSportCategoryRuleAdminPage =
        ActionEnum.VIEW.toString() +
        SportCategoryRuleResourceEnum.SPORT_CATEGORY_RULE_ADMIN_PAGE.toString();
    public static readonly viewSportCategoryRuleEditPage =
        ActionEnum.VIEW.toString() +
        SportCategoryRuleResourceEnum.SPORT_CATEGORY_RULE_EDIT_PAGE.toString();
    public static readonly viewSportCategoryRuleListPage =
        ActionEnum.VIEW.toString() +
        SportCategoryRuleResourceEnum.SPORT_CATEGORY_RULE_LIST_PAGE.toString();
}
