import { map, Observable, of, switchMap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleDataService, RoleEntity } from '@app/api/domain/role';
import {
    UserEntity,
    UserEntityAdd,
    UserEntityUpdate,
    UserModel,
    UserModelUpdate,
} from '@app/api/domain/user';
import { EntityUtilServiceImpl } from '@app/core/entity';
import { Entity, EntityAdd, EntityUpdate } from '@app/api/core/entity';

@Injectable()
export class UserUtilServiceImpl extends EntityUtilServiceImpl {
    public override createEntitySearchParameter(entity: Entity | EntityAdd | EntityUpdate): string[] {
        throw new Error('Method not implemented.');
    }
    private roleDataService: RoleDataService;

    public _sort = (a: UserEntity, b: UserEntity): number =>
        a.email < b.email ? 1 : -1;

    public constructor(formBuilder: FormBuilder) {
        super(formBuilder);

        this.roleDataService = inject(RoleDataService);
    }

    public override convertEntityUpdateToModelUpdate(
        entity: UserEntityUpdate
    ): UserModelUpdate {
        return this.convertEntityToModel(entity as UserEntity);
    }

    public override convertModelToEntity$(
        model: UserModel
    ): Observable<UserEntity> {
        return super.convertModelToEntity$(model).pipe(
            map((entity) => entity as UserEntity),
            switchMap((entity) => {
                return this.convertRoleIdsToRoles$(model.roleIds || []).pipe(
                    switchMap((roles) =>
                        of({
                            ...entity,
                            roles,
                        })
                    )
                );
            })
        );
    }

    public override convertModelUpdateToEntityUpdate$(
        model: UserModelUpdate
    ): Observable<UserEntityUpdate> {
        return super.convertModelUpdateToEntityUpdate$(model).pipe(
            map((entity) => entity as UserEntityUpdate),
            switchMap((entity) => {
                if (model.displayName) {
                    entity.displayName = model.displayName;
                }

                if (model.firstName) {
                    entity.firstName = model.firstName;
                }

                if (model.photoURL) {
                    entity.photoURL = model.photoURL;
                }

                if (model.lastName) {
                    entity.lastName = model.lastName;
                }

                if (model.email) {
                    entity.email = model.email;
                }

                if (model.language) {
                    entity.language = model.language;
                }

                if (model.phone) {
                    entity.phone = model.phone;
                }

                if (model.roleIds) {
                    return this.convertRoleIdsToRoles$(model.roleIds).pipe(
                        switchMap((roles) =>
                            of({
                                ...entity,
                                roles,
                            })
                        )
                    );
                } else {
                    return of(entity);
                }
            })
        );
    }

    public createEntity(formGroup: FormGroup): UserEntityAdd {
        const now = new Date().toISOString();

        return {
            email: formGroup.value['email'],
            displayName: formGroup.value['displayName'],
            firstName: formGroup.value['firstName'],
            lastName: formGroup.value['lastName'],
            photoURL: formGroup.value['photoURL'],
            language: formGroup.value['language'],
            phone: formGroup.value['phone'],
            meta: {
                creationDate: now,
                lastUpdated: now,
            },
            roles: formGroup.value['roles'],
        };
    }

    public createFormGroup(user: UserEntity | undefined): FormGroup {
        return this.formBuilder.group({
            displayName: [user?.displayName || null],
            firstName: [user?.firstName || null],
            lastName: [user?.lastName || null],
            email: [
                user?.email || null,
                [Validators.required, Validators.email],
            ],
            photoURL: [user?.photoURL || null],
            phone: [user?.phone || null],
            language: [user?.language || null],
            roles: [user?.roles || null],
            meta: [user?.meta || null],
            uid: [user?.uid],
        });
    }

    public updateEntity(formGroup: FormGroup): UserEntityUpdate {
        const now = new Date().toISOString();

        return {
            email: formGroup.value['email'],
            displayName: formGroup.value['displayName'],
            firstName: formGroup.value['firstName'],
            lastName: formGroup.value['lastName'],
            photoURL: formGroup.value['photoURL'],
            language: formGroup.value['language'],
            phone: formGroup.value['phone'],
            meta: {
                ...formGroup.value['meta'],
                lastUpdated: now,
            },
            roles: formGroup.value['roles'],
            uid: formGroup.value['uid'],
        };
    }

    private convertRoleIdsToRoles$(
        roleIds: string[]
    ): Observable<RoleEntity[]> {
        return this.roleDataService.listByIds$(roleIds);
    }

    public override convertEntityToModel(entity: UserEntity): UserModel {
        const {
            displayName,
            email,
            firstName,
            language,
            lastName,
            phone,
            photoURL,
            roles,
        } = entity;

        return {
            ...super.convertEntityToModel(entity),
            displayName,
            email,
            firstName,
            language,
            lastName,
            phone,
            photoURL,
            roles: roles || [],
        };
    }
}
