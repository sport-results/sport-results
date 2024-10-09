import { Observable } from 'rxjs';

import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
    SportResultEntity,
    SportResultEntityAdd,
    SportResultEntityUpdate,
    SportResultStoreService,
} from '@app/api/domain/sport-result';

import * as sportResultActions from './sport-result.actions';
import * as fromSportResult from './sport-result.reducer';
import * as SportResultSelectors from './sport-result.selectors';

@Injectable()
export class SportResultStoreServiceImpl extends SportResultStoreService {
    public constructor(private store: Store<fromSportResult.SportResultPartialState>) {
        super();
    }

    public dispatchAddEntityAction(
        sportResult: SportResultEntityAdd,
        parentEntityId?: string
    ): void {
        this.store.dispatch(sportResultActions.addEntity({ sportResult,  parentEntityId }));
    }

    public dispatchChangeNewEntityButtonEnabled(enabled: boolean): void {
        this.store.dispatch(
            sportResultActions.changeNewEntityButtonEnabled({ enabled })
        );
    }

    public dispatchGetEntityAction(uid: string): void {
        this.store.dispatch(sportResultActions.loadEntity({ uid }));
    }

    public dispatchListEntitiesAction(
        subCollectionPath?: string,
        pathParams?: string[],
        queryParams?: KeyValue<string, string>[]
    ): void {
        this.store.dispatch(sportResultActions.listEntities({
            subCollectionPath,
            pathParams: pathParams,
            queryParams: queryParams,
        }));
    }

    public dispatchSelectEntityAction(sportResult: SportResultEntity | null): void {
        this.store.dispatch(sportResultActions.selectEntity({ sportResult }));
    }

    public dispatchUpdateEntityAction(
        sportResult: SportResultEntityUpdate,
        subCollectionPath?: string
    ): void {
        this.store.dispatch(sportResultActions.updateEntity({
            sportResult,
            subCollectionPath
        }));
    }

    public isLoading$(): Observable<boolean> {
        return this.store.pipe(select(SportResultSelectors.getEntityLoading));
    }

    public selectEntity$(
        uid: string
    ): Observable<SportResultEntity | undefined> {
        return this.store.pipe(select(SportResultSelectors.getEntityById(uid)));
    }

    public selectEntities$(): Observable<SportResultEntity[]> {
        return this.store.pipe(select(SportResultSelectors.getAll));
    }

    public override selectEntityById$(
        entityId: string
    ): Observable<SportResultEntity | undefined> {
        return this.store.pipe(select(SportResultSelectors.getEntityById(entityId)));
    }

    public selectNewEntityButtonEnabled$(): Observable<boolean> {
        return this.store.pipe(select(SportResultSelectors.isNewEntityButtonEnabled));
    }

    public selectSelectedEntity$(): Observable<SportResultEntity | null> {
        return this.store.pipe(select(SportResultSelectors.getSelectedEntity));
    }
}
