import { ActionEnum } from '../../common';
import { NetworkPlayerResourceEnum } from './network-player';

export abstract class NetworkPlayerPermissionsService {
    public static readonly createNetworkPlayerEntity =
        ActionEnum.CREATE.toString() + NetworkPlayerResourceEnum.NETWORK_PLAYER_ENTITY.toString();
    public static readonly deleteNetworkPlayerEntity =
        ActionEnum.DELETE.toString() + NetworkPlayerResourceEnum.NETWORK_PLAYER_ENTITY.toString();
    public static readonly updateNetworkPlayerEntity =
        ActionEnum.UPDATE.toString() + NetworkPlayerResourceEnum.NETWORK_PLAYER_ENTITY.toString();
    public static readonly viewNetworkPlayerEntity =
        ActionEnum.VIEW.toString() + NetworkPlayerResourceEnum.NETWORK_PLAYER_ENTITY.toString();
}
