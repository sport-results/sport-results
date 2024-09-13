import { map, Observable, Subject, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleNames } from '@app/api/common';
import {
    RoleEntity,
    RolePermissionsService,
    RoleStoreService,
} from '@app/api/domain/role';
import { ComponentStore } from '@ngrx/component-store';

export type RoleTableState = {
    roleEntities: RoleEntity[];
};

export type RoleTableViewModel = {
    roleEntities: RoleEntity[];
    buttonPermissions: string[];
    editRole$$: Subject<RoleEntity>;
};

@Injectable()
export class RoleTableService extends ComponentStore<RoleTableState> {
    private readonly handleEditRole = this.effect(
        (editRole$: Observable<RoleEntity>) => {
            return editRole$.pipe(
                tap((roleEntity) => this.editRole(roleEntity))
            );
        }
    );
    private readonly roleEntities$ = this.select((state) => state.roleEntities);
    private readonly selectRoleEntities = this.effect(() => {
        return this.roleStoreService.selectEntities$().pipe(
            tap((roleEntities) => {
                this.updateRoleEntitiesState(roleEntities);
            })
        );
    });

    private editRole$$: Subject<RoleEntity>;

    public readonly roleTableViewModel$: Observable<RoleTableViewModel> =
        this.select({
            roleEntities: this.roleEntities$,
        }).pipe(
            map((roleFormViewModel) => ({
                ...roleFormViewModel,
                buttonPermissions: [
                    RoleNames.ADMIN,
                    RolePermissionsService.updateRoleEntity,
                ],
                editRole$$: this.editRole$$,
            }))
        );

    public constructor(
        private activatedRoute: ActivatedRoute,
        private roleStoreService: RoleStoreService,
        private router: Router
    ) {
        super({
            roleEntities: [],
        });

        this.editRole$$ = new Subject();
    }

    public editRole(roleEntity: RoleEntity): void {
        this.router.navigate(['../edit', roleEntity?.uid], {
            relativeTo: this.activatedRoute,
        });
    }

    public init$(): void {
        this.selectRoleEntities();
        this.handleEditRole(this.editRole$$.asObservable());
    }

    private updateRoleEntitiesState(roleEntities: RoleEntity[]): void {
        this.setState((state) => {
            return {
                ...state,
                roleEntities,
            };
        });
    }
}
