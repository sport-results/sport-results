import { Observable } from 'rxjs';

import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  NetworkPlayerEntity,
  NetworkPlayerEntityAdd,
  NetworkPlayerEntityUpdate,
  NetworkPlayerStoreService,
} from '@app/api/domain/network-player';

import * as networkPlayerActions from './network-player.actions';
import * as fromNetworkPlayer from './network-player.reducer';
import * as NetworkPlayerSelectors from './network-player.selectors';

@Injectable()
export class NetworkPlayerStoreServiceImpl extends NetworkPlayerStoreService {
  public constructor(
    private store: Store<fromNetworkPlayer.NetworkPlayerPartialState>
  ) {
    super();
  }

  public dispatchAddEntityAction(
    networkPlayer: NetworkPlayerEntityAdd,
    subCollectionPath?: string
  ): void {
    this.store.dispatch(
      networkPlayerActions.addEntity({ networkPlayer, subCollectionPath })
    );
  }

  public dispatchChangeNewEntityButtonEnabled(enabled: boolean): void {
    this.store.dispatch(
      networkPlayerActions.changeNewEntityButtonEnabled({ enabled })
    );
  }

  public dispatchGetEntityAction(uid: string): void {
    this.store.dispatch(networkPlayerActions.loadEntity({ uid }));
  }

  public dispatchListEntitiesAction(
    subCollectionPath?: string,
    pathParams?: string[],
    queryParams?: KeyValue<string, string>[]
  ): void {
    this.store.dispatch(
      networkPlayerActions.listEntities({
        subCollectionPath,
        pathParams: pathParams,
        queryParams: queryParams,
      })
    );
  }

  public override dispatchLoadEntityAction(uid: string): void {
    this.store.dispatch(networkPlayerActions.loadEntity({ uid }));
  }

  public override dispatchResetAction(): void {
    this.store.dispatch(networkPlayerActions.reset());
  }

  public dispatchSelectEntityAction(
    networkPlayer: NetworkPlayerEntity | null
  ): void {
    this.store.dispatch(networkPlayerActions.selectEntity({ networkPlayer }));
  }

  public dispatchUpdateEntityAction(
    networkPlayer: NetworkPlayerEntityUpdate,
    subCollectionPath?: string
  ): void {
    this.store.dispatch(
      networkPlayerActions.updateEntity({
        networkPlayer,
        subCollectionPath,
      })
    );
  }

  public isLoading$(): Observable<boolean> {
    return this.store.pipe(select(NetworkPlayerSelectors.getEntityLoading));
  }

  public selectEntity$(
    uid: string
  ): Observable<NetworkPlayerEntity | undefined> {
    return this.store.pipe(select(NetworkPlayerSelectors.getEntityById(uid)));
  }

  public selectEntities$(): Observable<NetworkPlayerEntity[]> {
    return this.store.pipe(select(NetworkPlayerSelectors.getAll));
  }

  public override selectEntityById$(
    entityId: string
  ): Observable<NetworkPlayerEntity | undefined> {
    return this.store.pipe(
      select(NetworkPlayerSelectors.getEntityById(entityId))
    );
  }

  public selectEntitiesBySportNetworkId$(
    sportNetworkId: string
  ): Observable<NetworkPlayerEntity[]> {
    return this.store.pipe(
      select(NetworkPlayerSelectors.getEntitiesBySportNetworkId(sportNetworkId))
    );
  }

  public selectNewEntityButtonEnabled$(): Observable<boolean> {
    return this.store.pipe(
      select(NetworkPlayerSelectors.isNewEntityButtonEnabled)
    );
  }

  public selectSelectedEntity$(): Observable<NetworkPlayerEntity | null> {
    return this.store.pipe(select(NetworkPlayerSelectors.getSelectedEntity));
  }
}
