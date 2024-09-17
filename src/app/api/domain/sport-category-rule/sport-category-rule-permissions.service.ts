import { ActionEnum } from '../../common';
import { SportCategoryRuleResourceEnum } from './sport-category-rule';

export abstract class SportCategoryRulePermissionsService {
    public static readonly createSportCategoryRuleEntity =
        ActionEnum.CREATE.toString() + SportCategoryRuleResourceEnum.SPORT_CATEGORY_RULE_ENTITY.toString();
    public static readonly deleteSportCategoryRuleEntity =
        ActionEnum.DELETE.toString() + SportCategoryRuleResourceEnum.SPORT_CATEGORY_RULE_ENTITY.toString();
    public static readonly updateSportCategoryRuleEntity =
        ActionEnum.UPDATE.toString() + SportCategoryRuleResourceEnum.SPORT_CATEGORY_RULE_ENTITY.toString();
    public static readonly viewSportCategoryRuleEntity =
        ActionEnum.VIEW.toString() + SportCategoryRuleResourceEnum.SPORT_CATEGORY_RULE_ENTITY.toString();
}
