import { map, Observable, Subject, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleNames } from '@app/api/common';
import {
    NetworkPlayerEntity,
    NetworkPlayerPermissionsService,
    NetworkPlayerStoreService,
} from '@app/api/domain/network-player';
import { ComponentStore } from '@ngrx/component-store';

export type NetworkPlayerTableState = {
    entities: NetworkPlayerEntity[];
};

export type EntityTableViewModel = {
    entities: NetworkPlayerEntity[];
    editEntity$$: Subject<NetworkPlayerEntity>;
    buttonPermissions: string[];
};

@Injectable()
export class NetworkPlayerTableService extends ComponentStore<NetworkPlayerTableState> {
     private readonly handleEditEntity = this.effect(
        (editEntity$: Observable<NetworkPlayerEntity>) => {
            return editEntity$.pipe(
                tap((entity) => this.editEntity(entity))
            );
        }
    );
    private readonly entities$ = this.select((state) => state.entities);
    private readonly selectEntities = this.effect(() => {
        return this.networkPlayerStoreService.selectEntities$().pipe(
            tap((entities) => {
                this.updateEntitiesState(entities);
            })
        );
    });

    private editEntity$$: Subject<NetworkPlayerEntity>;

    public readonly entityTableViewModel$: Observable<EntityTableViewModel> =
        this.select({
            entities: this.entities$,
        }).pipe(
            map((entityFormViewModel) => ({
                ...entityFormViewModel,
                buttonPermissions: [
                    RoleNames.ADMIN,
                    NetworkPlayerPermissionsService.updateNetworkPlayerEntity,
                ],
                editEntity$$: this.editEntity$$,
            }))
        );

    public constructor(
        private activatedRoute: ActivatedRoute,
        private networkPlayerStoreService: NetworkPlayerStoreService,
        private router: Router
    ) {
        super({
            entities: [],
        });

        this.editEntity$$ = new Subject();
    }

    public editEntity(entity: NetworkPlayerEntity): void {
        this.router.navigate(['../edit', entity?.uid], {
            relativeTo: this.activatedRoute,
        });
    }

    public init$(): void {
        this.selectEntities();
        this.handleEditEntity(this.editEntity$$.asObservable());
    }

    private updateEntitiesState(entities: NetworkPlayerEntity[]): void {
        this.setState((state) => {
            return {
                ...state,
                entities,
            };
        });
    }
}
