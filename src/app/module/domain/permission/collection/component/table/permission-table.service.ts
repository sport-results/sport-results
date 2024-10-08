import { map, Observable, Subject, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleNamesEnum } from '@app/api/common';
import {
    PermissionEntity,
    PermissionPermissionsService,
    PermissionStoreService,
} from '@app/api/domain/permission';
import { ComponentStore } from '@ngrx/component-store';

export type PermissionTableState = {
    entities: PermissionEntity[];
};

export type EntityTableViewModel = {
    entities: PermissionEntity[];
    editEntity$$: Subject<PermissionEntity>;
    buttonPermissions: string[];
};

@Injectable()
export class PermissionTableService extends ComponentStore<PermissionTableState> {
     private readonly handleEditEntity = this.effect(
        (editEntity$: Observable<PermissionEntity>) => {
            return editEntity$.pipe(
                tap((entity) => this.editEntity(entity))
            );
        }
    );
    private readonly entities$ = this.select((state) => state.entities);
    private readonly selectEntities = this.effect(() => {
        return this.permissionStoreService.selectEntities$().pipe(
            tap((entities) => {
                this.updateEntitiesState(entities);
            })
        );
    });

    private editEntity$$: Subject<PermissionEntity>;

    public readonly entityTableViewModel$: Observable<EntityTableViewModel> =
        this.select({
            entities: this.entities$,
        }).pipe(
            map((entityFormViewModel) => ({
                ...entityFormViewModel,
                buttonPermissions: [
                  RoleNamesEnum.ADMIN,
                    PermissionPermissionsService.updatePermissionEntity,
                ],
                editEntity$$: this.editEntity$$,
            }))
        );

    public constructor(
        private activatedRoute: ActivatedRoute,
        private permissionStoreService: PermissionStoreService,
        private router: Router
    ) {
        super({
            entities: [],
        });

        this.editEntity$$ = new Subject();
    }

    public editEntity(entity: PermissionEntity): void {
        this.router.navigate(['../edit', entity?.uid], {
            relativeTo: this.activatedRoute,
        });
    }

    public init$(): void {
        this.selectEntities();
        this.handleEditEntity(this.editEntity$$.asObservable());
    }

    private updateEntitiesState(entities: PermissionEntity[]): void {
        this.setState((state) => {
            return {
                ...state,
                entities,
            };
        });
    }
}
