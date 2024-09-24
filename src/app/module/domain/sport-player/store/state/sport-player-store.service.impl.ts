import { Observable } from 'rxjs';

import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
    SportPlayerEntity,
    SportPlayerEntityAdd,
    SportPlayerEntityUpdate,
    SportPlayerStoreService,
} from '@app/api/domain/sport-player';

import * as sportPlayerActions from './sport-player.actions';
import * as fromSportPlayer from './sport-player.reducer';
import * as SportPlayerSelectors from './sport-player.selectors';

@Injectable()
export class SportPlayerStoreServiceImpl extends SportPlayerStoreService {
    public constructor(private store: Store<fromSportPlayer.SportPlayerPartialState>) {
        super();
    }

    public dispatchAddEntityAction(
        sportPlayer: SportPlayerEntityAdd,
        parentEntityId?: string
    ): void {
        this.store.dispatch(sportPlayerActions.addEntity({ sportPlayer,  parentEntityId }));
    }

    public dispatchChangeNewEntityButtonEnabled(enabled: boolean): void {
        this.store.dispatch(
            sportPlayerActions.changeNewEntityButtonEnabled({ enabled })
        );
    }

    public dispatchGetEntityAction(uid: string): void {
        this.store.dispatch(sportPlayerActions.loadEntity({ uid }));
    }

    public dispatchListEntitiesAction(
        subCollectionPath?: string,
        pathParams?: string[],
        queryParams?: KeyValue<string, string>[]
    ): void {
        this.store.dispatch(sportPlayerActions.listEntities({
            subCollectionPath,
            pathParams: pathParams,
            queryParams: queryParams,
        }));
    }

    public dispatchSelectEntityAction(sportPlayer: SportPlayerEntity | null): void {
        this.store.dispatch(sportPlayerActions.selectEntity({ sportPlayer }));
    }

    public dispatchUpdateEntityAction(
        sportPlayer: SportPlayerEntityUpdate,
        subCollectionPath?: string
    ): void {
        this.store.dispatch(sportPlayerActions.updateEntity({
            sportPlayer,
            subCollectionPath
        }));
    }

    public isLoading$(): Observable<boolean> {
        return this.store.pipe(select(SportPlayerSelectors.getEntityLoading));
    }

    public selectEntity$(
        uid: string
    ): Observable<SportPlayerEntity | undefined> {
        return this.store.pipe(select(SportPlayerSelectors.getEntityById(uid)));
    }

    public selectEntities$(): Observable<SportPlayerEntity[]> {
        return this.store.pipe(select(SportPlayerSelectors.getAll));
    }

    public override selectEntityById$(
        entityId: string
    ): Observable<SportPlayerEntity | undefined> {
        return this.store.pipe(select(SportPlayerSelectors.getEntityById(entityId)));
    }

    public selectNewEntityButtonEnabled$(): Observable<boolean> {
        return this.store.pipe(select(SportPlayerSelectors.isNewEntityButtonEnabled));
    }

    public selectSelectedEntity$(): Observable<SportPlayerEntity | null> {
        return this.store.pipe(select(SportPlayerSelectors.getSelectedEntity));
    }
}
