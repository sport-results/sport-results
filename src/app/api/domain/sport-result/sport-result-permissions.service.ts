import { ActionEnum } from '../../common';
import { SportResultResourceEnum } from './sport-result';

export abstract class SportResultPermissionsService {
    public static readonly createSportResultEntity =
        ActionEnum.CREATE.toString() + SportResultResourceEnum.SPORT_RESULT_ENTITY.toString();
    public static readonly deleteSportResultEntity =
        ActionEnum.DELETE.toString() + SportResultResourceEnum.SPORT_RESULT_ENTITY.toString();
    public static readonly updateSportResultEntity =
        ActionEnum.UPDATE.toString() + SportResultResourceEnum.SPORT_RESULT_ENTITY.toString();
    public static readonly viewSportResultEntity =
        ActionEnum.VIEW.toString() + SportResultResourceEnum.SPORT_RESULT_ENTITY.toString();
}
