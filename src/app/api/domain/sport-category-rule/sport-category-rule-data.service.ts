import { EntityDataService } from '../../core';
import { SportCategoryRuleModel, SportCategoryRuleModelAdd, SportCategoryRuleModelUpdate } from './sport-category-rule';

export abstract class SportCategoryRuleDataService extends EntityDataService<
    SportCategoryRuleModel,
    SportCategoryRuleModelAdd,
    SportCategoryRuleModelUpdate
> {}
