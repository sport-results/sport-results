import { Observable } from 'rxjs';

import { EntityStoreService } from '../../core';
import {
  NetworkPlayerEntity,
  NetworkPlayerEntityAdd,
  NetworkPlayerEntityUpdate,
} from './network-player';

export abstract class NetworkPlayerStoreService extends EntityStoreService<
  NetworkPlayerEntity,
  NetworkPlayerEntityAdd,
  NetworkPlayerEntityUpdate
> {
  public abstract dispatchChangeNewEntityButtonEnabled(enabled: boolean): void;
  public abstract selectNewEntityButtonEnabled$(): Observable<boolean>;
  public abstract selectEntitiesBySportNetworkId$(
    sportNetworkId: string
  ): Observable<NetworkPlayerEntity[]>;
}
