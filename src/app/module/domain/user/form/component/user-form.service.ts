import { Observable, Subject, tap } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { RoleEntity, RoleStoreService } from '@app/api/domain/role';
import {
    UserEntity,
    UserStoreService,
    UserUtilService,
} from '@app/api/domain/user';

export interface UserFormState {
    formGroup: FormGroup | undefined;
    roles: RoleEntity[];
    userEntity: UserEntity | undefined;
    userId: string | undefined;
}

export type UserFormViewModel = {
    formGroup: FormGroup;
    languages: string[];
    roles: RoleEntity[];
    cancel$$: Subject<void>;
    submit$$: Subject<void>;
};

@Injectable()
export class UserFormService extends ComponentStore<UserFormState> {
    private activatedRoute = inject(ActivatedRoute);
    private roleStoreService = inject(RoleStoreService);
    private userStoreService = inject(UserStoreService);
    private userUtilService = inject(UserUtilService);
    private router = inject(Router);

    private readonly formGroup$ = this.select((state) => state.formGroup);
    private readonly getDataForSubmit$ = this.select((state) => ({
        userEntity: state.userEntity,
        formGroup: state.formGroup,
    }));
    private readonly handleCancel = this.effect((cancel$: Observable<void>) => {
        return cancel$.pipe(tap(() => this.cancel()));
    });
    private readonly handleSubmit = this.effect((submit$: Observable<void>) => {
        return submit$.pipe(
            switchMap(() =>
                this.getDataForSubmit$.pipe(
                    tap(({ userEntity, formGroup }) =>
                        this.submit(userEntity, formGroup as FormGroup)
                    )
                )
            )
        );
    });
    private readonly roles$ = this.select((state) => state.roles);
    private readonly selectRoles = this.effect(() => {
        return this.roleStoreService.selectEntities$().pipe(
            tap((roles) => {
                this.updateRolesState(roles);
            })
        );
    });
    private readonly selectUserEntity = this.effect(
        (userId$: Observable<string | undefined>) => {
            return userId$.pipe(
                switchMap((userId) =>
                    this.userStoreService.selectEntityById$(userId || '').pipe(
                        tap((userEntity) => {
                            this.updateUserEntityState(userEntity);
                            this.updateFormGroupState(
                                this.userUtilService.createFormGroup(userEntity)
                            );
                        })
                    )
                )
            );
        }
    );
    private readonly userEntity$ = this.select((state) => state.userEntity);

    private cancel$$: Subject<void>;
    private submit$$: Subject<void>;

    public readonly userFormViewModel$: Observable<UserFormViewModel> =
        this.select({
            formGroup: this.formGroup$.pipe(
                map((formGroup) => formGroup as FormGroup)
            ),
            roles: this.roles$,
        }).pipe(
            map((userFormViewModel) =>
                this.extendsUserFormViewModel(userFormViewModel)
            )
        );
    readonly userId$ = this.select((state) => state.userId);

    public constructor(
    ) {
        super({
            formGroup: undefined,
            roles: [],
            userEntity: undefined,
            userId: undefined,
        });

        this.cancel$$ = new Subject();
        this.submit$$ = new Subject();
    }

    public cancel(): void {
        this.router.navigate(['../../list'], {
            relativeTo: this.activatedRoute,
        });
    }

    public init(userId: string | undefined): void {
        this.updateUserIdState(userId);
        this.selectUserEntity(this.userId$);
        this.selectRoles();
        this.handleCancel(this.cancel$$.asObservable());
        this.handleSubmit(this.submit$$.asObservable());
    }

    private addUser(formGroup: FormGroup): void {
        this.userStoreService.dispatchAddEntityAction(
            this.userUtilService.createEntity(formGroup)
        );
    }

    private extendsUserFormViewModel(
        userFormViewModel: Partial<UserFormViewModel>
    ): UserFormViewModel {
        return {
            formGroup: userFormViewModel.formGroup as FormGroup,
            roles: userFormViewModel.roles as RoleEntity[],
            languages: ['en', 'hu'],
            cancel$$: this.cancel$$,
            submit$$: this.submit$$,
        };
    }

    private submit(
        userEntity: UserEntity | undefined,
        formGroup: FormGroup
    ): void {
        if (userEntity) {
            this.updateUser(formGroup);
        } else {
            this.addUser(formGroup);
        }

        this.router.navigate(['../../list'], {
            relativeTo: this.activatedRoute,
        });
    }

    private updateFormGroupState(formGroup: FormGroup): void {
        this.setState((state) => {
            return {
                ...state,
                formGroup,
            };
        });
    }

    private updateRolesState(roles: RoleEntity[]): void {
        this.setState((state) => {
            return {
                ...state,
                roles,
            };
        });
    }

    private updateUser(formGroup: FormGroup): void {
        this.userStoreService.dispatchUpdateEntityAction(
            this.userUtilService.updateEntity(formGroup)
        );
    }

    private updateUserEntityState(userEntity: UserEntity | undefined): void {
        this.setState((state) => {
            return {
                ...state,
                userEntity,
            };
        });
    }

    private updateUserIdState(userId: string | undefined): void {
        this.setState((state) => {
            return {
                ...state,
                userId,
            };
        });
    }
}
