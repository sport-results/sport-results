import { Injectable } from '@angular/core';

import { ActionEnum } from '../../common/action';
import {
    SportEventPermissionsService,
    SportEventResourceEnum,
} from '../../domain/sport-event';

@Injectable()
export class SportEventAdminPermissionsService extends SportEventPermissionsService {
    public static readonly viewSportEventAdminPage =
        ActionEnum.VIEW.toString() +
        SportEventResourceEnum.SPORT_EVENT_ADMIN_PAGE.toString();
    public static readonly viewSportEventEditPage =
        ActionEnum.VIEW.toString() +
        SportEventResourceEnum.SPORT_EVENT_EDIT_PAGE.toString();
    public static readonly viewSportEventListPage =
        ActionEnum.VIEW.toString() +
        SportEventResourceEnum.SPORT_EVENT_LIST_PAGE.toString();
}
