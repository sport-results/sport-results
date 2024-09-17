import { EntityUtilService } from '../../core';
import {
    SportCategoryRuleEntity,
    SportCategoryRuleEntityAdd,
    SportCategoryRuleEntityUpdate,
    SportCategoryRuleModel,
    SportCategoryRuleModelAdd,
    SportCategoryRuleModelUpdate
} from './sport-category-rule';

export abstract class SportCategoryRuleUtilService extends EntityUtilService<
    SportCategoryRuleEntity,
    SportCategoryRuleEntityAdd,
    SportCategoryRuleEntityUpdate,
    SportCategoryRuleModel,
    SportCategoryRuleModelAdd,
    SportCategoryRuleModelUpdate
> {}
