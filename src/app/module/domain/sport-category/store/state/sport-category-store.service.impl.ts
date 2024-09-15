import { Observable } from 'rxjs';

import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
    SportCategoryEntity,
    SportCategoryEntityAdd,
    SportCategoryEntityUpdate,
    SportCategoryStoreService,
} from '@app/api/domain/sport-category';

import * as sportCategoryActions from './sport-category.actions';
import * as fromSportCategory from './sport-category.reducer';
import * as SportCategorySelectors from './sport-category.selectors';

@Injectable()
export class SportCategoryStoreServiceImpl extends SportCategoryStoreService {
    public constructor(private store: Store<fromSportCategory.SportCategoryPartialState>) {
        super();
    }

    public dispatchAddEntityAction(sportCategory: SportCategoryEntityAdd): void {
        this.store.dispatch(sportCategoryActions.addEntity({ sportCategory }));
    }

    public dispatchChangeNewEntityButtonEnabled(enabled: boolean): void {
        this.store.dispatch(
            sportCategoryActions.changeNewEntityButtonEnabled({ enabled })
        );
    }

    public dispatchGetEntityAction(uid: string): void {
        this.store.dispatch(sportCategoryActions.loadEntity({ uid }));
    }

    public dispatchListEntitiesAction(pathParams?: string[],
        queryParams?: KeyValue<string, string>[]): void {
        this.store.dispatch(sportCategoryActions.listEntities({
            pathParams: pathParams || [],
            queryParams: queryParams || [],
        }));
    }

    public dispatchSelectEntityAction(sportCategory: SportCategoryEntity | null): void {
        this.store.dispatch(sportCategoryActions.selectEntity({ sportCategory }));
    }

    public dispatchUpdateEntityAction(sportCategory: SportCategoryEntityUpdate): void {
        this.store.dispatch(sportCategoryActions.updateEntity({ sportCategory }));
    }

    public isLoading$(): Observable<boolean> {
        return this.store.pipe(select(SportCategorySelectors.getEntityLoading));
    }

    public selectEntity$(
        uid: string
    ): Observable<SportCategoryEntity | undefined> {
        return this.store.pipe(select(SportCategorySelectors.getEntityById(uid)));
    }

    public selectEntities$(): Observable<SportCategoryEntity[]> {
        return this.store.pipe(select(SportCategorySelectors.getAll));
    }

    public override selectEntityById$(
        entityId: string
    ): Observable<SportCategoryEntity | undefined> {
        return this.store.pipe(select(SportCategorySelectors.getEntityById(entityId)));
    }

    public selectNewEntityButtonEnabled$(): Observable<boolean> {
        return this.store.pipe(select(SportCategorySelectors.isNewEntityButtonEnabled));
    }

    public selectSelectedEntity$(): Observable<SportCategoryEntity | null> {
        return this.store.pipe(select(SportCategorySelectors.getSelectedEntity));
    }
}
