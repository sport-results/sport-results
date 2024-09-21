import { ActionEnum } from '../../common';
import { SportNetworkResourceEnum } from './sport-network';

export abstract class SportNetworkPermissionsService {
    public static readonly createSportNetworkEntity =
        ActionEnum.CREATE.toString() + SportNetworkResourceEnum.SPORT_NETWORK_ENTITY.toString();
    public static readonly deleteSportNetworkEntity =
        ActionEnum.DELETE.toString() + SportNetworkResourceEnum.SPORT_NETWORK_ENTITY.toString();
    public static readonly updateSportNetworkEntity =
        ActionEnum.UPDATE.toString() + SportNetworkResourceEnum.SPORT_NETWORK_ENTITY.toString();
    public static readonly viewSportNetworkEntity =
        ActionEnum.VIEW.toString() + SportNetworkResourceEnum.SPORT_NETWORK_ENTITY.toString();
}
