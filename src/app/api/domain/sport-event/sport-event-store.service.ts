import { Observable } from 'rxjs';

import { EntityStoreService } from '../../core';
import { SportEventEntity, SportEventEntityAdd, SportEventEntityUpdate } from './sport-event';

export abstract class SportEventStoreService extends EntityStoreService<
    SportEventEntity,
    SportEventEntityAdd,
    SportEventEntityUpdate
> {
    public abstract dispatchChangeNewEntityButtonEnabled(
        enabled: boolean
    ): void;
    public abstract dispatchListEntitiesByIdsAction(ids: string[]): void;
    public abstract selectNewEntityButtonEnabled$(): Observable<boolean>;
    public abstract selectEntitiesByIds$(ids: string[]): Observable<SportEventEntity[]>;
}
