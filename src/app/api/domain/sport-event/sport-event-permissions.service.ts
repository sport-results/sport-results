import { ActionEnum } from '../../common';
import { SportEventResourceEnum } from './sport-event';

export abstract class SportEventPermissionsService {
    public static readonly createSportEventEntity =
        ActionEnum.CREATE.toString() + SportEventResourceEnum.SPORT_EVENT_ENTITY.toString();
    public static readonly deleteSportEventEntity =
        ActionEnum.DELETE.toString() + SportEventResourceEnum.SPORT_EVENT_ENTITY.toString();
    public static readonly updateSportEventEntity =
        ActionEnum.UPDATE.toString() + SportEventResourceEnum.SPORT_EVENT_ENTITY.toString();
    public static readonly viewSportEventEntity =
        ActionEnum.VIEW.toString() + SportEventResourceEnum.SPORT_EVENT_ENTITY.toString();
}
