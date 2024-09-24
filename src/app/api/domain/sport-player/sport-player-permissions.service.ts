import { ActionEnum } from '../../common';
import { SportPlayerResourceEnum } from './sport-player';

export abstract class SportPlayerPermissionsService {
    public static readonly createSportPlayerEntity =
        ActionEnum.CREATE.toString() + SportPlayerResourceEnum.SPORT_PLAYER_ENTITY.toString();
    public static readonly deleteSportPlayerEntity =
        ActionEnum.DELETE.toString() + SportPlayerResourceEnum.SPORT_PLAYER_ENTITY.toString();
    public static readonly updateSportPlayerEntity =
        ActionEnum.UPDATE.toString() + SportPlayerResourceEnum.SPORT_PLAYER_ENTITY.toString();
    public static readonly viewSportPlayerEntity =
        ActionEnum.VIEW.toString() + SportPlayerResourceEnum.SPORT_PLAYER_ENTITY.toString();
}
