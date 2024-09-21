import { map, Observable, Subject, tap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleNames } from '@app/api/common';
import {
    SportNetworkEntity,
    SportNetworkPermissionsService,
    SportNetworkStoreService,
} from '@app/api/domain/sport-network';
import { ComponentStore } from '@ngrx/component-store';

export type SportNetworkTableState = {
    entities: SportNetworkEntity[];
};

export type EntityTableViewModel = {
    entities: SportNetworkEntity[];
    editEntity$$: Subject<SportNetworkEntity>;
    buttonPermissions: string[];
};

@Injectable()
export class SportNetworkTableService extends ComponentStore<SportNetworkTableState> {
    private activatedRoute = inject(ActivatedRoute);
    private sportNetworkStoreService = inject(SportNetworkStoreService);
    private router = inject(Router);
    
    private readonly entities$ = this.select((state) => state.entities);

     private readonly handleEditEntity = this.effect(
        (editEntity$: Observable<SportNetworkEntity>) => {
            return editEntity$.pipe(
                tap((entity) => this.editEntity(entity))
            );
        }
    );
   
    private readonly selectEntities = this.effect(() => {
        return this.sportNetworkStoreService.selectEntities$().pipe(
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
                    RoleNames.ADMIN,
                    SportNetworkPermissionsService.updateSportNetworkEntity,
                ],
                editEntity$$: this.editEntity$$,
            }))
        );

    private editEntity$$: Subject<SportNetworkEntity>;

    public constructor() {
        super({
            entities: [],
        });

        this.editEntity$$ = new Subject();
    }

    public editEntity(entity: SportNetworkEntity): void {
        this.router.navigate(['../edit', entity?.uid], {
            relativeTo: this.activatedRoute,
        });
    }

    public init$(): void {
        this.selectEntities();
        this.handleEditEntity(this.editEntity$$.asObservable());
    }

    private updateEntitiesState(entities: SportNetworkEntity[]): void {
        this.setState((state) => {
            return {
                ...state,
                entities,
            };
        });
    }
}
