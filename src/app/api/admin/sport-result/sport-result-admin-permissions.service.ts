import { Injectable } from '@angular/core';

import { ActionEnum } from '../../common/action';
import {
    SportResultPermissionsService,
    SportResultResourceEnum,
} from '../../domain/sport-result';

@Injectable()
export class SportResultAdminPermissionsService extends SportResultPermissionsService {
    public static readonly viewSportResultAdminPage =
        ActionEnum.VIEW.toString() +
        SportResultResourceEnum.SPORT_RESULT_ADMIN_PAGE.toString();
    public static readonly viewSportResultEditPage =
        ActionEnum.VIEW.toString() +
        SportResultResourceEnum.SPORT_RESULT_EDIT_PAGE.toString();
    public static readonly viewSportResultListPage =
        ActionEnum.VIEW.toString() +
        SportResultResourceEnum.SPORT_RESULT_LIST_PAGE.toString();
}
