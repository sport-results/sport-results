import { map, Observable, Subject, switchMap, tap, withLatestFrom } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleNamesEnum } from '@app/api/common';
import {
  SportCategoryRuleEntity,
  SportCategoryRulePermissionsService,
  SportCategoryRuleStoreService,
} from '@app/api/domain/sport-category-rule';
import { ComponentStore } from '@ngrx/component-store';

export type SportCategoryRuleTableState = {
  entities: SportCategoryRuleEntity[];
  sportCategoryId: string | undefined;
};

export type EntityTableViewModel = {
  entities: SportCategoryRuleEntity[];
  editEntity$$: Subject<SportCategoryRuleEntity>;
  buttonPermissions: string[];
};

@Injectable()
export class SportCategoryRuleTableService extends ComponentStore<SportCategoryRuleTableState> {
  private activatedRoute = inject(ActivatedRoute);
  private sportCategoryRuleStoreService = inject(SportCategoryRuleStoreService);
  private router = inject(Router);

  private readonly entities$ = this.select((state) => state.entities);
  private readonly sportCategoryId$ = this.select(
    (state) => state.sportCategoryId
  );

  private readonly handleEditEntity = this.effect(
    (editEntity$: Observable<SportCategoryRuleEntity>) => {
      return editEntity$.pipe(tap((entity) => this.editEntity(entity)));
    }
  );

  private readonly selectEntities = this.effect(
    (sportCategoryId$: Observable<string | undefined>) => {
      return sportCategoryId$.pipe(
        switchMap((sportCategoryId) =>
          this.sportCategoryRuleStoreService.selectRulesByCategoryId$(
            sportCategoryId || ''
          )
        ),
        tap((entities) => {
          this.updateEntitiesState(entities);
        })
      );
    }
  );

  private editEntity$$: Subject<SportCategoryRuleEntity>;

  public readonly entityTableViewModel$: Observable<EntityTableViewModel> =
    this.select({
      entities: this.entities$,
    }).pipe(
      map((entityFormViewModel) => ({
        ...entityFormViewModel,
        buttonPermissions: [
          RoleNamesEnum.ADMIN,
          SportCategoryRulePermissionsService.updateSportCategoryRuleEntity,
        ],
        editEntity$$: this.editEntity$$,
      }))
    );

  public constructor() {
    super({
      entities: [],
      sportCategoryId: undefined,
    });

    this.editEntity$$ = new Subject();
  }

  public editEntity(entity: SportCategoryRuleEntity): void {
    this.router.navigate([`../edit-rule/${entity.sportCategory.uid}/${entity?.uid}`], {
      relativeTo: this.activatedRoute,
    });
  }

  public init$(sportCategoryId: string | undefined): void {
    this.updateSportCategoryIdState(sportCategoryId);
    this.selectEntities(this.sportCategoryId$);
    this.handleEditEntity(this.editEntity$$.asObservable());
  }

  private updateEntitiesState(entities: SportCategoryRuleEntity[]): void {
    this.setState((state) => {
      return {
        ...state,
        entities,
      };
    });
  }

  private updateSportCategoryIdState(
    sportCategoryId: string | undefined
  ): void {
    this.setState((state) => {
      return {
        ...state,
        sportCategoryId,
      };
    });
  }
}
