import { Injectable } from '@angular/core';

import { ActionEnum } from '../../common/action';
import {
    NetworkPlayerPermissionsService,
    NetworkPlayerResourceEnum,
} from '../../domain/network-player';

@Injectable()
export class NetworkPlayerAdminPermissionsService extends NetworkPlayerPermissionsService {
    public static readonly viewNetworkPlayerAdminPage =
        ActionEnum.VIEW.toString() +
        NetworkPlayerResourceEnum.NETWORK_PLAYER_ADMIN_PAGE.toString();
    public static readonly viewNetworkPlayerEditPage =
        ActionEnum.VIEW.toString() +
        NetworkPlayerResourceEnum.NETWORK_PLAYER_EDIT_PAGE.toString();
    public static readonly viewNetworkPlayerListPage =
        ActionEnum.VIEW.toString() +
        NetworkPlayerResourceEnum.NETWORK_PLAYER_LIST_PAGE.toString();
}
