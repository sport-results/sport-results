import { map, Observable, Subject, tap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleNames } from '@app/api/common';
import {
  SportEventEntity,
  SportEventPermissionsService,
  SportEventStoreService,
} from '@app/api/domain/sport-event';
import { ComponentStore } from '@ngrx/component-store';

export type SportEventCardState = {
  entities: SportEventEntity[];
  sportEventsByPermissions: SportEventEntity[];
};

export type EntityCardViewModel = {
  entities: SportEventEntity[];
  editEntity$$: Subject<SportEventEntity>;
  sportEventsByPermissions: SportEventEntity[];
};

@Injectable()
export class SportEventCardService extends ComponentStore<SportEventCardState> {
  private activatedRoute = inject(ActivatedRoute);
  private sportEventStoreService = inject(SportEventStoreService);
  private router = inject(Router);

  private readonly entities$ = this.select((state) => state.entities);
  private readonly sportEventsByPermissions$ = this.select((state) => state.sportEventsByPermissions);

  private readonly handleEditEntity = this.effect(
    (editEntity$: Observable<SportEventEntity>) => {
      return editEntity$.pipe(tap((entity) => this.editEntity(entity)));
    }
  );

  private readonly selectEntities = this.effect(() => {
    return this.sportEventStoreService.selectEntities$().pipe(
      tap((entities) => {
        this.updateEntitiesState(entities);
      })
    );
  });

  private editEntity$$: Subject<SportEventEntity>;

  public readonly entityCardViewModel$: Observable<EntityCardViewModel> =
    this.select({
      entities: this.entities$,
      sportEventsByPermissions: this.sportEventsByPermissions$
    }).pipe(
      map((entityFormViewModel) => ({
        ...entityFormViewModel,
        editEntity$$: this.editEntity$$,
      }))
    );

  public constructor() {
    super({
      entities: [],
      sportEventsByPermissions: [],
    });

    this.editEntity$$ = new Subject();
  }

  public editEntity(entity: SportEventEntity): void {
    this.router.navigate(['../edit', entity?.uid], {
      relativeTo: this.activatedRoute,
    });
  }

  public init$(sportEventsByPermissions: SportEventEntity[]): void {
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

  private updateSportEventsByPermissionsState(sportEventsByPermissions: SportEventEntity[]): void {
    this.setState((state) => {
      return {
        ...state,
        sportEventsByPermissions,
      };
    });
  }
}
