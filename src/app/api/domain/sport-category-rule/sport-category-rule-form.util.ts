import { FormGroup } from '@angular/forms';
import { EntityFormUtil } from '../../core';
import { SportCategoryRuleEntityAdd } from './sport-category-rule';
import { SportCategoryEntitySimple } from '../sport-category/sport-category';

export abstract class SportCategoryRuleFormUtil extends EntityFormUtil {
  public abstract createEntityWithCategory(
    formGroup: FormGroup,
    sportCategory?: SportCategoryEntitySimple
  ): SportCategoryRuleEntityAdd;
}
