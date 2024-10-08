import { map, Observable, Subject, tap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleNamesEnum } from '@app/api/common';
import {
  SportPlayerEntity,
  SportPlayerPermissionsService,
  SportPlayerStoreService,
} from '@app/api/domain/sport-player';
import { ComponentStore } from '@ngrx/component-store';

export type SportPlayerTableState = {
  entities: SportPlayerEntity[];
};

export type EntityTableViewModel = {
  entities: SportPlayerEntity[];
  editEntity$$: Subject<SportPlayerEntity>;
  buttonPermissions: string[];
};

@Injectable()
export class SportPlayerTableService extends ComponentStore<SportPlayerTableState> {
  private activatedRoute = inject(ActivatedRoute);
  private sportPlayerStoreService = inject(SportPlayerStoreService);
  private router = inject(Router);

  private readonly handleEditEntity = this.effect(
    (editEntity$: Observable<SportPlayerEntity>) => {
      return editEntity$.pipe(tap((entity) => this.editEntity(entity)));
    }
  );
  private readonly entities$ = this.select((state) => state.entities);
  private readonly selectEntities = this.effect(() => {
    return this.sportPlayerStoreService.selectEntities$().pipe(
      tap((entities) => {
        this.updateEntitiesState(entities);
      })
    );
  });

  private editEntity$$: Subject<SportPlayerEntity>;

  public readonly entityTableViewModel$: Observable<EntityTableViewModel> =
    this.select({
      entities: this.entities$,
    }).pipe(
      map((entityFormViewModel) => ({
        ...entityFormViewModel,
        buttonPermissions: [
          RoleNamesEnum.ADMIN,
          SportPlayerPermissionsService.updateSportPlayerEntity,
        ],
        editEntity$$: this.editEntity$$,
      }))
    );

  public constructor() {
    super({
      entities: [],
    });

    this.editEntity$$ = new Subject();
  }

  public editEntity(entity: SportPlayerEntity): void {
    this.router.navigate(['../edit', entity?.uid], {
      relativeTo: this.activatedRoute,
    });
  }

  public init$(): void {
    this.selectEntities();
    this.handleEditEntity(this.editEntity$$.asObservable());
  }

  private updateEntitiesState(entities: SportPlayerEntity[]): void {
    this.setState((state) => {
      return {
        ...state,
        entities,
      };
    });
  }
}
