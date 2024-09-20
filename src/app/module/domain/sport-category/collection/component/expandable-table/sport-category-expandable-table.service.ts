import { map, Observable, Subject, tap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleNames } from '@app/api/common';
import {
  SportCategoryEntity,
  SportCategoryPermissionsService,
  SportCategoryStoreService,
} from '@app/api/domain/sport-category';
import { ComponentStore } from '@ngrx/component-store';
import { SportCategoryRulePermissionsService } from '@app/api/domain/sport-category-rule';

export type SportCategoryExpandableTableState = {
  entities: SportCategoryEntity[];
  isNewRuleButtonEnabled: boolean;
};

export type EntityTableViewModel = {
  addSportCategoryRule$$: Subject<string>;
  buttonPermissions: string[];
  entities: SportCategoryEntity[];
  editEntity$$: Subject<SportCategoryEntity>;
  ruleButtonPermissions: string[];
};

@Injectable()
export class SportCategoryExpandableTableService extends ComponentStore<SportCategoryExpandableTableState> {
  private activatedRoute = inject(ActivatedRoute);
  private sportCategoryStoreService = inject(SportCategoryStoreService);
  private router = inject(Router);

  private readonly handleEditEntity = this.effect(
    (editEntity$: Observable<SportCategoryEntity>) => {
      return editEntity$.pipe(tap((entity) => this.editEntity(entity)));
    }
  );

  private readonly handleAddSportCategoryRule = this.effect(
    (addSportCategoryRule$: Observable<string>) => {
      return addSportCategoryRule$.pipe(
        tap((parentEntityId) => this.addSportCategoryRule(parentEntityId))
      );
    }
  );

  private readonly entities$ = this.select((state) => state.entities);
  private readonly selectEntities = this.effect(() => {
    return this.sportCategoryStoreService.selectEntities$().pipe(
      tap((entities) => {
        this.updateEntitiesState(entities);
      })
    );
  });

  private editEntity$$: Subject<SportCategoryEntity>;
  private addSportCategoryRule$$: Subject<string>;

  public readonly entityTableViewModel$: Observable<EntityTableViewModel> =
    this.select({
      entities: this.entities$,
    }).pipe(
      map((entityFormViewModel) => ({
        ...entityFormViewModel,
        buttonPermissions: [
          RoleNames.ADMIN,
          SportCategoryPermissionsService.updateSportCategoryEntity,
        ],
        ruleButtonPermissions: [
          RoleNames.ADMIN,
          SportCategoryRulePermissionsService.createSportCategoryRuleEntity,
        ],
        editEntity$$: this.editEntity$$,
        addSportCategoryRule$$: this.addSportCategoryRule$$,
      }))
    );

  public constructor() {
    super({
      entities: [],
      isNewRuleButtonEnabled: false,
    });

    this.addSportCategoryRule$$ = new Subject();
    this.editEntity$$ = new Subject();
  }

  public editEntity(entity: SportCategoryEntity): void {
    this.router.navigate(['../edit', entity?.uid], {
      relativeTo: this.activatedRoute,
    });
  }

  public init$(): void {
    this.selectEntities();
    this.handleEditEntity(this.editEntity$$.asObservable());
    this.handleAddSportCategoryRule(this.addSportCategoryRule$$.asObservable());
  }

  private updateEntitiesState(entities: SportCategoryEntity[]): void {
    this.setState((state) => {
      return {
        ...state,
        entities,
      };
    });
  }

  public addSportCategoryRule(parentEntityId: string): void {
    this.router.navigate(['../edit-rule', parentEntityId, 0], {
      relativeTo: this.activatedRoute,
    });
  }
}
