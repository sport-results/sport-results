import { Observable } from 'rxjs';

import { EntityStoreService } from '../../core';
import { SportResultEntity, SportResultEntityAdd, SportResultEntityUpdate } from './sport-result';

export abstract class SportResultStoreService extends EntityStoreService<
    SportResultEntity,
    SportResultEntityAdd,
    SportResultEntityUpdate
> {
    public abstract dispatchChangeNewEntityButtonEnabled(
        enabled: boolean
    ): void;
    public abstract selectNewEntityButtonEnabled$(): Observable<boolean>;
}
