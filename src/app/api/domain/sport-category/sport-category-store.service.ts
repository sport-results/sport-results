import { Observable } from 'rxjs';

import { EntityStoreService } from '../../core';
import { SportCategoryEntity, SportCategoryEntityAdd, SportCategoryEntityUpdate } from './sport-category';

export abstract class SportCategoryStoreService extends EntityStoreService<
    SportCategoryEntity,
    SportCategoryEntityAdd,
    SportCategoryEntityUpdate
> {
    public abstract dispatchChangeNewEntityButtonEnabled(
        enabled: boolean
    ): void;
    public abstract selectNewEntityButtonEnabled$(): Observable<boolean>;
}
