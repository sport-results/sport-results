import { Injectable } from '@angular/core';

import { ActionEnum } from '../../common/action';
import {
    SportCategoryPermissionsService,
    SportCategoryResourceEnum,
} from '../../domain/sport-category';

@Injectable()
export class SportCategoryAdminPermissionsService extends SportCategoryPermissionsService {
    public static readonly viewSportCategoryAdminPage =
        ActionEnum.VIEW.toString() +
        SportCategoryResourceEnum.SPORT_CATEGORY_ADMIN_PAGE.toString();
    public static readonly viewSportCategoryEditPage =
        ActionEnum.VIEW.toString() +
        SportCategoryResourceEnum.SPORT_CATEGORY_EDIT_PAGE.toString();
    public static readonly viewSportCategoryListPage =
        ActionEnum.VIEW.toString() +
        SportCategoryResourceEnum.SPORT_CATEGORY_LIST_PAGE.toString();
}
