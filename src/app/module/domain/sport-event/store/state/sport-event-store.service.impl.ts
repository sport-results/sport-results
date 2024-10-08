import { Observable } from 'rxjs';

import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  SportEventEntity,
  SportEventEntityAdd,
  SportEventEntityUpdate,
  SportEventStoreService,
} from '@app/api/domain/sport-event';

import * as sportEventActions from './sport-event.actions';
import * as fromSportEvent from './sport-event.reducer';
import * as SportEventSelectors from './sport-event.selectors';

@Injectable()
export class SportEventStoreServiceImpl extends SportEventStoreService {
  public constructor(
    private store: Store<fromSportEvent.SportEventPartialState>
  ) {
    super();
  }

  public dispatchAddEntityAction(
    sportEvent: SportEventEntityAdd,
    subCollectionPath?: string
  ): void {
    this.store.dispatch(
      sportEventActions.addEntity({ sportEvent, subCollectionPath })
    );
  }

  public dispatchChangeNewEntityButtonEnabled(enabled: boolean): void {
    this.store.dispatch(
      sportEventActions.changeNewEntityButtonEnabled({ enabled })
    );
  }

  public override dispatchDeleteEntityAction(
    sportEvent: SportEventEntity,
    subCollectionPath?: string,
  ): void {
    this.store.dispatch(
      sportEventActions.deleteEntity({ entityId: sportEvent.uid, subCollectionPath })
    );
  }

  public dispatchGetEntityAction(uid: string): void {
    this.store.dispatch(sportEventActions.loadEntity({ uid }));
  }

  public dispatchListEntitiesAction(
    subCollectionPath?: string,
    pathParams?: string[],
    queryParams?: KeyValue<string, string>[]
  ): void {
    this.store.dispatch(
      sportEventActions.listEntities({
        subCollectionPath,
        pathParams: pathParams,
        queryParams: queryParams,
      })
    );
  }

  public dispatchListEntitiesByIdsAction(ids: string[]): void {
    this.store.dispatch(
      sportEventActions.listEntitiesByIds({
        ids,
      })
    );
  }

  public override dispatchResetAction(): void {
    this.store.dispatch(sportEventActions.reset());
  }

  public dispatchSelectEntityAction(sportEvent: SportEventEntity | null): void {
    this.store.dispatch(sportEventActions.selectEntity({ sportEvent }));
  }

  public dispatchUpdateEntityAction(
    sportEvent: SportEventEntityUpdate,
    subCollectionPath?: string
  ): void {
    this.store.dispatch(
      sportEventActions.updateEntity({
        sportEvent,
        subCollectionPath,
      })
    );
  }

  public isLoading$(): Observable<boolean> {
    return this.store.pipe(select(SportEventSelectors.getEntityLoading));
  }

  public selectEntity$(uid: string): Observable<SportEventEntity | undefined> {
    return this.store.pipe(select(SportEventSelectors.getEntityById(uid)));
  }

  public selectEntities$(): Observable<SportEventEntity[]> {
    return this.store.pipe(select(SportEventSelectors.getAll));
  }

  public override selectEntityById$(
    entityId: string
  ): Observable<SportEventEntity | undefined> {
    return this.store.pipe(select(SportEventSelectors.getEntityById(entityId)));
  }

  public selectEntitiesByIds$(ids: string[]): Observable<SportEventEntity[]> {
    return this.store.pipe(select(SportEventSelectors.getEntitiesByIds(ids)));
  }

  public selectNewEntityButtonEnabled$(): Observable<boolean> {
    return this.store.pipe(
      select(SportEventSelectors.isNewEntityButtonEnabled)
    );
  }

  public selectSelectedEntity$(): Observable<SportEventEntity | null> {
    return this.store.pipe(select(SportEventSelectors.getSelectedEntity));
  }
}
