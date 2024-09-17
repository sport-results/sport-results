import { EntityEffectService } from '../../core';
import {
  SportCategoryRuleEntity,
  SportCategoryRuleEntityAdd,
  SportCategoryRuleEntityUpdate,
} from './sport-category-rule';

export abstract class SportCategoryRuleEffectService extends EntityEffectService<
  SportCategoryRuleEntity,
  SportCategoryRuleEntityAdd,
  SportCategoryRuleEntityUpdate
> {}
