import { catchError, map, of, switchMap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { SportCategoryRuleEffectService } from '@app/api/domain/sport-category-rule';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as sportCategoryRuleActions from './sport-category-rule.actions';
import { SPORT_CATEGORY_FEATURE_KEY } from '@app/api/domain/sport-category';

@Injectable()
export class SportCategoryRuleEffects {
  private actions$ = inject(Actions);
  private sportCategoryRuleEffectService = inject(
    SportCategoryRuleEffectService
  );

  addEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sportCategoryRuleActions.addEntity),
      switchMap((action) =>
        this.sportCategoryRuleEffectService
          .addEntity$(action.sportCategoryRule, action.subCollectionPath)
          .pipe(
            map((entity) =>
              sportCategoryRuleActions.addEntitySuccess({
                sportCategoryRule: entity,
              })
            ),
            catchError((error) => {
              return of(sportCategoryRuleActions.addEntityFail({ error }));
            })
          )
      )
    )
  );

  listGroupEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sportCategoryRuleActions.listGroupEntities),
      switchMap((action) =>
        this.sportCategoryRuleEffectService
          .listEntitiesByCollectionGroup$(action.ids)
          .pipe(
            map((entities) => {
              return sportCategoryRuleActions.listGroupEntitiesSuccess({
                sportCategoryRules: entities,
              });
            }),
            catchError((error) => {
              return of(sportCategoryRuleActions.listGroupEntitiesFail({ error }));
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
          ),
          catchError((error) => {
            return of(sportCategoryRuleActions.loadEntityFail({ error }));
          })
        )
      )
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sportCategoryRuleActions.updateEntity),
      switchMap((action) =>
        this.sportCategoryRuleEffectService
          .updateEntity$(action.sportCategoryRule, action.subCollectionPath)
          .pipe(
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
}
