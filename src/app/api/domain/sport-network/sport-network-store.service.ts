import { Observable } from 'rxjs';

import { EntityStoreService } from '../../core';
import { SportNetworkEntity, SportNetworkEntityAdd, SportNetworkEntityUpdate } from './sport-network';

export abstract class SportNetworkStoreService extends EntityStoreService<
    SportNetworkEntity,
    SportNetworkEntityAdd,
    SportNetworkEntityUpdate
> {
    public abstract dispatchChangeNewEntityButtonEnabled(
        enabled: boolean
    ): void;
    public abstract selectNewEntityButtonEnabled$(): Observable<boolean>;
}
