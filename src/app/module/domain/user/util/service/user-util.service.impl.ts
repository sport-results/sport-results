import { concatMap, first, map, mergeMap, Observable, of, switchMap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Entity,
  EntityAdd,
  EntityUpdate,
  SimpleEntity,
  SimpleModel,
} from '@app/api/core/entity';
import { RoleStoreService } from '@app/api/domain/role';
import {
  UserEntity,
  UserEntityAdd,
  UserEntityUpdate,
  UserModel,
  UserModelAdd,
  UserModelUpdate,
} from '@app/api/domain/user';
import { EntityUtilServiceImpl } from '@app/core/entity';

@Injectable()
export class UserUtilServiceImpl extends EntityUtilServiceImpl {
  public override createSimpleEntity(model: SimpleModel): SimpleEntity {
    throw new Error('Method not implemented.');
  }
  public override createSimpleModel(entity: SimpleEntity): SimpleModel {
    throw new Error('Method not implemented.');
  }
  private roleStoreService = inject(RoleStoreService);

  public _sort = (a: UserEntity, b: UserEntity): number =>
    a.email < b.email ? 1 : -1;

  public constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  public override convertEntityAddToModelAdd(
    entity: UserEntityAdd
  ): UserModelAdd {
    const model: UserModelAdd = super.convertEntityAddToModelAdd(
      entity
    ) as UserModelAdd;

    return {
      ...model,
      displayName: entity.displayName,
      email: entity.email,
      firstName: entity.firstName,
      language: entity.language,
      lastName: entity.lastName,
      phone: entity.phone,
      photoURL: entity.photoURL,
      roleIds: entity.roles?.map((role) => role.uid),
    };
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

  public override convertEntityUpdateToModelUpdate(
    entity: UserEntityUpdate
  ): UserModelUpdate {
    const model: UserModelUpdate = super.convertEntityUpdateToModelUpdate(
      entity
    );

    return {
      ...model,
      displayName: entity.displayName,
      email: entity.email,
      firstName: entity.firstName,
      language: entity.language,
      lastName: entity.lastName,
      phone: entity.phone,
      photoURL: entity.photoURL,
      roleIds: entity.roles?.map((role) => role.uid),
    };
  }

  public override convertModelToEntity$(
    model: UserModel
  ): Observable<UserEntity> {
    console.log('User util service')
    return super.convertModelToEntity$(model).pipe(
      map((entity) => entity as UserEntity),
      concatMap((entity) => {
        const x$ = this.roleStoreService
        .selectEntitiesByIds$(model.roleIds || [])
        .pipe(
          first(),
          map((roles) => {
            return {
              ...entity,
              roles,
            }
          })
        );

        x$.subscribe({
          next: console.log,
          error: console.error
        });

        return x$;
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
          return this.roleStoreService.selectEntitiesByIds$(model.roleIds).pipe(
            map((roles) => ({
              ...entity,
              roles,
            }))
          );
        } else {
          return of(entity);
        }
      })
    );
  }

  public override createEntity(formGroup: FormGroup): UserEntityAdd {
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

  public override createEntitySearchParameter(
    entity: Entity | EntityAdd | EntityUpdate
  ): string[] {
    throw new Error('Method not implemented.');
  }

  public override createFormGroup(user: UserEntity | undefined): FormGroup {
    return this.formBuilder.group({
      displayName: [user?.displayName || null],
      firstName: [user?.firstName || null],
      lastName: [user?.lastName || null],
      email: [user?.email || null, [Validators.required, Validators.email]],
      photoURL: [user?.photoURL || null],
      phone: [user?.phone || null],
      language: [user?.language || null],
      roles: [user?.roles || null],
      meta: [user?.meta || null],
      uid: [user?.uid],
    });
  }

  public override updateEntity(formGroup: FormGroup): UserEntityUpdate {
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
}
