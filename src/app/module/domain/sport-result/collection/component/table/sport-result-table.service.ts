import { map, Observable, Subject, tap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleNamesEnum } from '@app/api/common';
import {
  SportResultEntity,
  SportResultPermissionsService,
  SportResultStoreService,
} from '@app/api/domain/sport-result';
import { ComponentStore } from '@ngrx/component-store';

export type SportResultTableState = {
  entities: SportResultEntity[];
};

export type EntityTableViewModel = {
  entities: SportResultEntity[];
  editEntity$$: Subject<SportResultEntity>;
  buttonPermissions: string[];
};

@Injectable()
export class SportResultTableService extends ComponentStore<SportResultTableState> {
  private activatedRoute = inject(ActivatedRoute);
  private entityStoreService = inject(SportResultStoreService);
  private router = inject(Router)

  private readonly entities$ = this.select((state) => state.entities);
  
  private editEntity$$: Subject<SportResultEntity>;

  private readonly handleEditEntity = this.effect(
    (editEntity$: Observable<SportResultEntity>) => {
      return editEntity$.pipe(tap((entity) => this.editEntity(entity)));
    }
  );

  private readonly selectEntities = this.effect(() => {
    return this.entityStoreService.selectEntities$().pipe(
      tap((entities) => {
        this.updateEntitiesState(entities);
      })
    );
  });

  public readonly entityTableViewModel$: Observable<EntityTableViewModel> =
    this.select({
      entities: this.entities$,
    }).pipe(
      map((entityFormViewModel) => ({
        ...entityFormViewModel,
        buttonPermissions: [
          RoleNamesEnum.ADMIN,
          SportResultPermissionsService.updateSportResultEntity,
        ],
        editEntity$$: this.editEntity$$,
      }))
    );

  public constructor(
  ) {
    super({
      entities: [],
    });

    this.editEntity$$ = new Subject();
  }

  public editEntity(entity: SportResultEntity): void {
    this.router.navigate(['../edit', entity?.uid], {
      relativeTo: this.activatedRoute,
    });
  }

  public init$(): void {
    this.selectEntities();
    this.handleEditEntity(this.editEntity$$.asObservable());
  }

  private updateEntitiesState(entities: SportResultEntity[]): void {
    this.setState((state) => {
      return {
        ...state,
        entities,
      };
    });
  }
}
