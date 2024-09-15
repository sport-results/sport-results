import { ActionEnum } from '../../common';
import { SportCategoryResourceEnum } from './sport-category';

export abstract class SportCategoryPermissionsService {
    public static readonly createSportCategoryEntity =
        ActionEnum.CREATE.toString() + SportCategoryResourceEnum.SPORT_CATEGORY_ENTITY.toString();
    public static readonly deleteSportCategoryEntity =
        ActionEnum.DELETE.toString() + SportCategoryResourceEnum.SPORT_CATEGORY_ENTITY.toString();
    public static readonly updateSportCategoryEntity =
        ActionEnum.UPDATE.toString() + SportCategoryResourceEnum.SPORT_CATEGORY_ENTITY.toString();
    public static readonly viewSportCategoryEntity =
        ActionEnum.VIEW.toString() + SportCategoryResourceEnum.SPORT_CATEGORY_ENTITY.toString();
}
