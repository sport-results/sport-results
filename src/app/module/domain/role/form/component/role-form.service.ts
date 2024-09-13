import { SelectItemGroup } from 'primeng/api';
import { Observable, Subject, tap } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionsService } from '@app/api/common';
import {
    RoleEntity,
    RoleStoreService,
    RoleUtilService,
} from '@app/api/domain/role';
import { ComponentStore } from '@ngrx/component-store';

export interface RoleFormState {
    formGroup: FormGroup | undefined;
    roleEntity: RoleEntity | undefined;
    roleId: string | undefined;
}

export type RoleFormViewModel = {
    formGroup: FormGroup;
    permissions: SelectItemGroup[];
    cancel$$: Subject<void>;
    submit$$: Subject<void>;
};

@Injectable()
export class RoleFormService extends ComponentStore<RoleFormState> {
    private readonly fetchRoleEntity = this.effect(
        (roleId$: Observable<string | undefined>) => {
            return roleId$.pipe(
                switchMap((roleId) =>
                    this.roleStoreService.selectEntityById$(roleId || '').pipe(
                        tap((roleEntity) => {
                            this.updateRoleEntityState(roleEntity);
                            this.updateFormGroupState(
                                this.roleUtilService.createFormGroup(roleEntity)
                            );
                        })
                    )
                )
            );
        }
    );
    private readonly formGroup$ = this.select((state) => state.formGroup);
    private readonly getDataForSubmit$ = this.select((state) => ({
        roleEntity: state.roleEntity,
        formGroup: state.formGroup,
    }));
    private readonly handleCancel = this.effect((cancel$: Observable<void>) => {
        return cancel$.pipe(tap(() => this.cancel()));
    });
    private readonly handleSubmit = this.effect((submit$: Observable<void>) => {
        return submit$.pipe(
            switchMap(() =>
                this.getDataForSubmit$.pipe(
                    tap(({ roleEntity, formGroup }) =>
                        this.submit(roleEntity, formGroup as FormGroup)
                    )
                )
            )
        );
    });
    private readonly roleEntity$ = this.select((state) => state.roleEntity);

    private cancel$$: Subject<void>;
    private submit$$: Subject<void>;

    public readonly roleFormViewModel$: Observable<RoleFormViewModel> =
        this.select({
            formGroup: this.formGroup$.pipe(
                map((formGroup) => formGroup as FormGroup)
            ),
        }).pipe(
            map((roleFormViewModel) =>
                this.extendsRoleFormViewModel(roleFormViewModel)
            )
        );
    readonly roleId$ = this.select((state) => state.roleId);

    public constructor(
        private activatedRoute: ActivatedRoute,
        private roleStoreService: RoleStoreService,
        private roleUtilService: RoleUtilService,
        private router: Router
    ) {
        super();

        this.cancel$$ = new Subject();
        this.submit$$ = new Subject();

        const initialValues = {
            formGroup: undefined,
            roleEntity: undefined,
            roleId: undefined,
        };

        this.setState(initialValues);
    }

    public cancel(): void {
        this.router.navigate(['../../list'], {
            relativeTo: this.activatedRoute,
        });
    }

    public init(roleId: string | undefined): void {
        this.updateRoleIdState(roleId);
        this.fetchRoleEntity(this.roleId$);
        this.handleCancel(this.cancel$$.asObservable());
        this.handleSubmit(this.submit$$.asObservable());
    }

    private addRole(formGroup: FormGroup): void {
        this.roleStoreService.dispatchAddEntityAction(
            this.roleUtilService.createEntity(formGroup)
        );
    }

    private extendsRoleFormViewModel(
        roleFormViewModel: Partial<RoleFormViewModel>
    ): RoleFormViewModel {
        return {
            formGroup: roleFormViewModel.formGroup as FormGroup,
            permissions: PermissionsService.permissions,
            cancel$$: this.cancel$$,
            submit$$: this.submit$$,
        };
    }

    private submit(
        roleEntity: RoleEntity | undefined,
        formGroup: FormGroup
    ): void {
        if (roleEntity) {
            this.updateRole(formGroup);
        } else {
            this.addRole(formGroup);
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

    private updateRole(formGroup: FormGroup): void {
        this.roleStoreService.dispatchUpdateEntityAction(
            this.roleUtilService.updateEntity(formGroup)
        );
    }

    private updateRoleEntityState(roleEntity: RoleEntity | undefined): void {
        this.setState((state) => {
            return {
                ...state,
                roleEntity,
            };
        });
    }

    private updateRoleIdState(roleId: string | undefined): void {
        this.setState((state) => {
            return {
                ...state,
                roleId,
            };
        });
    }
}
