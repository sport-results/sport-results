import { catchError, map, of, switchMap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { SportCategoryEffectService } from '@app/api/domain/sport-category';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as sportCategoryActions from './sport-category.actions';

@Injectable()
export class SportCategoryEffects {
    private actions$ = inject(Actions);
    private sportCategoryEffectService = inject(SportCategoryEffectService);

    addEntity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sportCategoryActions.addEntity),
            switchMap((action) =>
                this.sportCategoryEffectService.addEntity$(action.sportCategory).pipe(
                    map((entity) =>
                        sportCategoryActions.addEntitySuccess({
                            sportCategory: entity,
                        })
                    )
                )
            )
        )
    );
    listEntities$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sportCategoryActions.listEntities),
            switchMap((action) =>
                this.sportCategoryEffectService
                    .listEntities$(action.subCollectionPath, action.pathParams, action.queryParams)
                    .pipe(
                        map((entities) => {
                            return sportCategoryActions.listEntitiesSuccess({
                                sportCategorys: entities,
                            });
                        })
                    )
            )
        )
    );
    loadEntity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sportCategoryActions.loadEntity),
            switchMap((action) =>
                this.sportCategoryEffectService.loadEntity$(action.uid).pipe(
                    map((entity) =>
                        sportCategoryActions.loadEntitySuccess({
                            sportCategory: entity,
                        })
                    )
                )
            )
        )
    );
    
    updateEntity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sportCategoryActions.updateEntity),
            switchMap((action) =>
                this.sportCategoryEffectService.updateEntity$(action.sportCategory).pipe(
                    map((entity) =>
                        sportCategoryActions.updateEntitySuccess({
                            sportCategory: {
                                changes: { ...entity },
                                id: entity && entity.uid,
                            },
                        })
                    ),
                    catchError((error) => {
                        return of(sportCategoryActions.updateEntityFail({ error }));
                    })
                )
            )
        )
    );
}
