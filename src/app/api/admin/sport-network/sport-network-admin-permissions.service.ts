import { Injectable } from '@angular/core';

import { ActionEnum } from '../../common/action';
import {
    SportNetworkPermissionsService,
    SportNetworkResourceEnum,
} from '../../domain/sport-network';

@Injectable()
export class SportNetworkAdminPermissionsService extends SportNetworkPermissionsService {
    public static readonly viewSportNetworkAdminPage =
        ActionEnum.VIEW.toString() +
        SportNetworkResourceEnum.SPORT_NETWORK_ADMIN_PAGE.toString();
    public static readonly viewSportNetworkEditPage =
        ActionEnum.VIEW.toString() +
        SportNetworkResourceEnum.SPORT_NETWORK_EDIT_PAGE.toString();
    public static readonly viewSportNetworkListPage =
        ActionEnum.VIEW.toString() +
        SportNetworkResourceEnum.SPORT_NETWORK_LIST_PAGE.toString();
}
