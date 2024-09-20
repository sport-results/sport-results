import { Observable } from 'rxjs';

import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  SportCategoryRuleEntity,
  SportCategoryRuleEntityAdd,
  SportCategoryRuleEntityUpdate,
  SportCategoryRuleStoreService,
} from '@app/api/domain/sport-category-rule';

import * as sportCategoryRuleActions from './sport-category-rule.actions';
import * as fromSportCategoryRule from './sport-category-rule.reducer';
import * as SportCategoryRuleSelectors from './sport-category-rule.selectors';

@Injectable()
export class SportCategoryRuleStoreServiceImpl extends SportCategoryRuleStoreService {
  public constructor(
    private store: Store<fromSportCategoryRule.SportCategoryRulePartialState>
  ) {
    super();
  }

  public dispatchAddEntityAction(
    sportCategoryRule: SportCategoryRuleEntityAdd,
    parentEntityId?: string
  ): void {
    this.store.dispatch(
      sportCategoryRuleActions.addEntity({ sportCategoryRule, parentEntityId })
    );
  }

  public dispatchChangeNewEntityButtonEnabled(enabled: boolean): void {
    this.store.dispatch(
      sportCategoryRuleActions.changeNewEntityButtonEnabled({ enabled })
    );
  }

  public dispatchGetEntityAction(uid: string): void {
    this.store.dispatch(sportCategoryRuleActions.loadEntity({ uid }));
  }

  public dispatchListEntitiesAction(
    subCollectionPath?: string,
    pathParams?: string[],
    queryParams?: KeyValue<string, string>[]
  ): void {
    this.store.dispatch(
      sportCategoryRuleActions.listEntities({
        subCollectionPath,
        pathParams: pathParams,
        queryParams: queryParams,
      })
    );
  }

  public dispatchSelectEntityAction(
    sportCategoryRule: SportCategoryRuleEntity | null
  ): void {
    this.store.dispatch(
      sportCategoryRuleActions.selectEntity({ sportCategoryRule })
    );
  }

  public dispatchUpdateEntityAction(
    sportCategoryRule: SportCategoryRuleEntityUpdate
  ): void {
    this.store.dispatch(
      sportCategoryRuleActions.updateEntity({ sportCategoryRule })
    );
  }

  public isLoading$(): Observable<boolean> {
    return this.store.pipe(select(SportCategoryRuleSelectors.getEntityLoading));
  }

  public selectEntity$(
    uid: string
  ): Observable<SportCategoryRuleEntity | undefined> {
    return this.store.pipe(
      select(SportCategoryRuleSelectors.getEntityById(uid))
    );
  }

  public selectEntities$(): Observable<SportCategoryRuleEntity[]> {
    return this.store.pipe(select(SportCategoryRuleSelectors.getAll));
  }

  public override selectEntityById$(
    entityId: string
  ): Observable<SportCategoryRuleEntity | undefined> {
    return this.store.pipe(
      select(SportCategoryRuleSelectors.getEntityById(entityId))
    );
  }

  public selectRulesByCategoryId$(
    categoryId: string
  ): Observable<SportCategoryRuleEntity[]> {
    return this.store.pipe(
      select(SportCategoryRuleSelectors.getRulesByCategoryId(categoryId))
    );
  }

  public selectNewEntityButtonEnabled$(): Observable<boolean> {
    return this.store.pipe(
      select(SportCategoryRuleSelectors.isNewEntityButtonEnabled)
    );
  }

  public selectSelectedEntity$(): Observable<SportCategoryRuleEntity | null> {
    return this.store.pipe(
      select(SportCategoryRuleSelectors.getSelectedEntity)
    );
  }
}
