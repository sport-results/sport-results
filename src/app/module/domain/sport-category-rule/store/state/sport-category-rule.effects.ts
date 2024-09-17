import { catchError, map, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { SportCategoryRuleEffectService } from '@app/api/domain/sport-category-rule';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as sportCategoryRuleActions from './sport-category-rule.actions';

@Injectable()
export class SportCategoryRuleEffects {
    addEntity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sportCategoryRuleActions.addEntity),
            switchMap((action) =>
                this.sportCategoryRuleEffectService.addEntity$(action.sportCategoryRule).pipe(
                    map((entity) =>
                        sportCategoryRuleActions.addEntitySuccess({
                            sportCategoryRule: entity,
                        })
                    )
                )
            )
        )
    );
    listEntities$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sportCategoryRuleActions.listEntities),
            switchMap((action) =>
                this.sportCategoryRuleEffectService
                    .listEntities$(action.pathParams, action.queryParams)
                    .pipe(
                        map((entities) => {
                            return sportCategoryRuleActions.listEntitiesSuccess({
                                sportCategoryRules: entities,
                            });
                        })
                    )
            )
        )
    );
    loadEntity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sportCategoryRuleActions.loadEntity),
            switchMap((action) =>
                this.sportCategoryRuleEffectService.loadEntity$(action.uid).pipe(
                    map((entity) =>
                        sportCategoryRuleActions.loadEntitySuccess({
                            sportCategoryRule: entity,
                        })
                    )
                )
            )
        )
    );
    
    updateEntity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sportCategoryRuleActions.updateEntity),
            switchMap((action) =>
                this.sportCategoryRuleEffectService.updateEntity$(action.sportCategoryRule).pipe(
                    map((entity) =>
                        sportCategoryRuleActions.updateEntitySuccess({
                            sportCategoryRule: {
                                changes: { ...entity },
                                id: entity && entity.uid,
                            },
                        })
                    ),
                    catchError((error) => {
                        return of(sportCategoryRuleActions.updateEntityFail({ error }));
                    })
                )
            )
        )
    );

    public constructor(
        private actions$: Actions,
        private sportCategoryRuleEffectService: SportCategoryRuleEffectService
    ) {}
}
