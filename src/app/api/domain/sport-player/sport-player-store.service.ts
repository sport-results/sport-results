import { Observable } from 'rxjs';

import { EntityStoreService } from '../../core';
import { SportPlayerEntity, SportPlayerEntityAdd, SportPlayerEntityUpdate } from './sport-player';

export abstract class SportPlayerStoreService extends EntityStoreService<
    SportPlayerEntity,
    SportPlayerEntityAdd,
    SportPlayerEntityUpdate
> {
    public abstract dispatchChangeNewEntityButtonEnabled(
        enabled: boolean
    ): void;
    public abstract selectNewEntityButtonEnabled$(): Observable<boolean>;
}
