import { Observable } from 'rxjs';

import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
    SportNetworkEntity,
    SportNetworkEntityAdd,
    SportNetworkEntityUpdate,
    SportNetworkStoreService,
} from '@app/api/domain/sport-network';

import * as sportNetworkActions from './sport-network.actions';
import * as fromSportNetwork from './sport-network.reducer';
import * as SportNetworkSelectors from './sport-network.selectors';

@Injectable()
export class SportNetworkStoreServiceImpl extends SportNetworkStoreService {
    public constructor(private store: Store<fromSportNetwork.SportNetworkPartialState>) {
        super();
    }

    public dispatchAddEntityAction(
        sportNetwork: SportNetworkEntityAdd,
        subCollectionPath?: string
    ): void {
        this.store.dispatch(sportNetworkActions.addEntity({ sportNetwork,  subCollectionPath }));
    }

    public dispatchChangeNewEntityButtonEnabled(enabled: boolean): void {
        this.store.dispatch(
            sportNetworkActions.changeNewEntityButtonEnabled({ enabled })
        );
    }

    public dispatchGetEntityAction(uid: string): void {
        this.store.dispatch(sportNetworkActions.loadEntity({ uid }));
    }

    public dispatchListEntitiesAction(
        subCollectionPath?: string,
        pathParams?: string[],
        queryParams?: KeyValue<string, string>[]
    ): void {
        this.store.dispatch(sportNetworkActions.listEntities({
            subCollectionPath,
            pathParams: pathParams,
            queryParams: queryParams,
        }));
    }

    public override dispatchResetAction(): void {
      this.store.dispatch(sportNetworkActions.reset());
    }

    public dispatchSelectEntityAction(sportNetwork: SportNetworkEntity | null): void {
        this.store.dispatch(sportNetworkActions.selectEntity({ sportNetwork }));
    }

    public dispatchUpdateEntityAction(
        sportNetwork: SportNetworkEntityUpdate,
        subCollectionPath?: string
    ): void {
        this.store.dispatch(sportNetworkActions.updateEntity({
            sportNetwork,
            subCollectionPath
        }));
    }

    public isLoading$(): Observable<boolean> {
        return this.store.pipe(select(SportNetworkSelectors.getEntityLoading));
    }

    public selectEntity$(
        uid: string
    ): Observable<SportNetworkEntity | undefined> {
        return this.store.pipe(select(SportNetworkSelectors.getEntityById(uid)));
    }

    public selectEntities$(): Observable<SportNetworkEntity[]> {
        return this.store.pipe(select(SportNetworkSelectors.getAll));
    }

    public override selectEntityById$(
        entityId: string
    ): Observable<SportNetworkEntity | undefined> {
        return this.store.pipe(select(SportNetworkSelectors.getEntityById(entityId)));
    }

    public selectNewEntityButtonEnabled$(): Observable<boolean> {
        return this.store.pipe(select(SportNetworkSelectors.isNewEntityButtonEnabled));
    }

    public selectSelectedEntity$(): Observable<SportNetworkEntity | null> {
        return this.store.pipe(select(SportNetworkSelectors.getSelectedEntity));
    }

    public selectSportNetworksByUserId$(
      userId: string
  ): Observable<SportNetworkEntity[]> {
      return this.store.pipe(select(SportNetworkSelectors.getNetworksByUserId(userId)));
  }
}
