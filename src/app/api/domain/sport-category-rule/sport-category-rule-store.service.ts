import { Observable } from 'rxjs';

import { EntityStoreService } from '../../core';
import {
  SportCategoryRuleEntity,
  SportCategoryRuleEntityAdd,
  SportCategoryRuleEntityUpdate,
} from './sport-category-rule';

export abstract class SportCategoryRuleStoreService extends EntityStoreService<
  SportCategoryRuleEntity,
  SportCategoryRuleEntityAdd,
  SportCategoryRuleEntityUpdate
> {
  public abstract dispatchChangeNewEntityButtonEnabled(enabled: boolean): void;
  public abstract selectNewEntityButtonEnabled$(): Observable<boolean>;
  public abstract selectRulesByCategoryId$(
    categoryId: string
  ): Observable<SportCategoryRuleEntity[]>;
}
