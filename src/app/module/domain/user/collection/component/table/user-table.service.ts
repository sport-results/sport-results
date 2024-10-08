import { map, Observable, Subject, tap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleNamesEnum } from '@app/api/common';
import {
    UserEntity,
    UserPermissionsService,
    UserStoreService,
} from '@app/api/domain/user';
import { ComponentStore } from '@ngrx/component-store';

export type UserTableState = {
    userEntities: UserEntity[];
};

export type UserTableViewModel = {
    userEntities: UserEntity[];
    buttonPermissions: string[];
    editUser$$: Subject<UserEntity>;
};

@Injectable()
export class UserTableService extends ComponentStore<UserTableState> {
    private activatedRoute = inject(ActivatedRoute);
    private userStoreService =  inject(UserStoreService);
    private router = inject(Router);

    private readonly handleEditUser = this.effect(
        (editUser$: Observable<UserEntity>) => {
            return editUser$.pipe(
                tap((userEntity) => this.editUser(userEntity))
            );
        }
    );
    private readonly selectUserEntities = this.effect(() => {
        return this.userStoreService.selectEntities$().pipe(
            tap((userEntities) => {
                this.updateUserEntitiesState(userEntities);
            })
        );
    });
    private readonly userEntities$ = this.select((state) => state.userEntities);

    private editUser$$: Subject<UserEntity>;

    public readonly userTableViewModel$: Observable<UserTableViewModel> =
        this.select({
            userEntities: this.userEntities$,
        }).pipe(
            map((userFormViewModel) => ({
                ...userFormViewModel,
                buttonPermissions: [
                  RoleNamesEnum.ADMIN,
                    UserPermissionsService.updateUserEntity,
                ],
                editUser$$: this.editUser$$,
            }))
        );

    public constructor(
    ) {
        super({
            userEntities: [],
        });

        this.editUser$$ = new Subject();
    }

    public editUser(userEntity: UserEntity): void {
        this.router.navigate(['../edit', userEntity?.uid], {
            relativeTo: this.activatedRoute,
        });
    }

    public init$(): void {
        this.selectUserEntities();
        this.handleEditUser(this.editUser$$.asObservable());
    }

    private updateUserEntitiesState(userEntities: UserEntity[]): void {
        this.setState((state) => {
            return {
                ...state,
                userEntities,
            };
        });
    }
}
