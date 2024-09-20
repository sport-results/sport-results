import { map, Observable, Subject, switchMap, tap, withLatestFrom } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleNames } from '@app/api/common';
import {
  SPORT_CATEGORY_FEATURE_KEY,
  SportCategoryEntity,
  SportCategoryPermissionsService,
  SportCategoryStoreService,
} from '@app/api/domain/sport-category';
import { ComponentStore } from '@ngrx/component-store';
import {
  SportCategoryRulePermissionsService,
  SportCategoryRuleStoreService,
} from '@app/api/domain/sport-category-rule';
import { TableRowExpandEvent } from 'primeng/table';
import { MessageService } from 'primeng/api';

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
  rowExpand$$: Subject<TableRowExpandEvent>;
};

@Injectable()
export class SportCategoryExpandableTableService extends ComponentStore<SportCategoryExpandableTableState> {
  private activatedRoute = inject(ActivatedRoute);
  private sportCategoryStoreService = inject(SportCategoryStoreService);
  private sportCategoryRuleStoreService = inject(SportCategoryRuleStoreService);
  private router = inject(Router);
  private messageService = inject(MessageService);

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
  private rowExpand$$: Subject<TableRowExpandEvent>;

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
        rowExpand$$: this.rowExpand$$,
      }))
    );

  public constructor() {
    super({
      entities: [],
      isNewRuleButtonEnabled: false,
    });

    this.addSportCategoryRule$$ = new Subject();
    this.editEntity$$ = new Subject();
    this.rowExpand$$ = new Subject();
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
    this.handleRowExpand(this.rowExpand$$.asObservable());
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

  rowExpand(
    event: TableRowExpandEvent
  ) {
    this.messageService.add({
      severity: 'info',
      summary: 'Category Expanded',
      detail: event.data.name,
      life: 3000,
    });

    const sportCategory = event.data as SportCategoryEntity;

    if (sportCategory) {
      this.sportCategoryRuleStoreService.dispatchListEntitiesAction(
        `${SPORT_CATEGORY_FEATURE_KEY}/${sportCategory.uid}`
      );
    }
  }

  private readonly handleRowExpand = this.effect(
    (rowExpand$: Observable<TableRowExpandEvent>) => {
      return rowExpand$.pipe(
        tap((event) => this.rowExpand(event)));
    }
  );
}
