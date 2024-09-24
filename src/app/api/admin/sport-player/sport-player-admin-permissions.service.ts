import { Injectable } from '@angular/core';

import { ActionEnum } from '../../common/action';
import {
    SportPlayerPermissionsService,
    SportPlayerResourceEnum,
} from '../../domain/sport-player';

@Injectable()
export class SportPlayerAdminPermissionsService extends SportPlayerPermissionsService {
    public static readonly viewSportPlayerAdminPage =
        ActionEnum.VIEW.toString() +
        SportPlayerResourceEnum.SPORT_PLAYER_ADMIN_PAGE.toString();
    public static readonly viewSportPlayerEditPage =
        ActionEnum.VIEW.toString() +
        SportPlayerResourceEnum.SPORT_PLAYER_EDIT_PAGE.toString();
    public static readonly viewSportPlayerListPage =
        ActionEnum.VIEW.toString() +
        SportPlayerResourceEnum.SPORT_PLAYER_LIST_PAGE.toString();
}
