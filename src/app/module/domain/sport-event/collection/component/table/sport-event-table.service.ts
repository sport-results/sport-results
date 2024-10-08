import { map, Observable, Subject, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleNamesEnum } from '@app/api/common';
import {
  SportEventEntity,
  SportEventPermissionsService,
  SportEventStoreService,
} from '@app/api/domain/sport-event';
import { ComponentStore } from '@ngrx/component-store';

export type SportEventTableState = {
  entities: SportEventEntity[];
};

export type EntityTableViewModel = {
  entities: SportEventEntity[];
  editEntity$$: Subject<SportEventEntity>;
  buttonPermissions: string[];
};

@Injectable()
export class SportEventTableService extends ComponentStore<SportEventTableState> {
  private readonly handleEditEntity = this.effect(
    (editEntity$: Observable<SportEventEntity>) => {
      return editEntity$.pipe(tap((entity) => this.editEntity(entity)));
    }
  );
  private readonly entities$ = this.select((state) => state.entities);
  private readonly selectEntities = this.effect(() => {
    return this.sportEventStoreService.selectEntities$().pipe(
      tap((entities) => {
        this.updateEntitiesState(entities);
      })
    );
  });

  private editEntity$$: Subject<SportEventEntity>;

  public readonly entityTableViewModel$: Observable<EntityTableViewModel> =
    this.select({
      entities: this.entities$,
    }).pipe(
      map((entityFormViewModel) => ({
        ...entityFormViewModel,
        buttonPermissions: [
          RoleNamesEnum.ADMIN,
          SportEventPermissionsService.updateSportEventEntity,
        ],
        editEntity$$: this.editEntity$$,
      }))
    );

  public constructor(
    private activatedRoute: ActivatedRoute,
    private sportEventStoreService: SportEventStoreService,
    private router: Router
  ) {
    super({
      entities: [],
    });

    this.editEntity$$ = new Subject();
  }

  public editEntity(entity: SportEventEntity): void {
    this.router.navigate(['../edit', entity?.uid], {
      relativeTo: this.activatedRoute,
    });
  }

  public init$(): void {
    this.selectEntities();
    this.handleEditEntity(this.editEntity$$.asObservable());
  }

  private updateEntitiesState(entities: SportEventEntity[]): void {
    this.setState((state) => {
      return {
        ...state,
        entities,
      };
    });
  }
}
