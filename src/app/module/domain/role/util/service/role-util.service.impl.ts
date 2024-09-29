import { map, Observable, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    RoleEntity,
    RoleEntityAdd,
    RoleEntityUpdate,
    RoleModelUpdate,
} from '@app/api/domain/role';
import { EntityUtilServiceImpl } from '@app/core/entity';
import { Entity, EntityAdd, EntityUpdate } from '@app/api/core/entity';

@Injectable()
export class RoleUtilServiceImpl extends EntityUtilServiceImpl {
    public override createEntitySearchParameter(entity: Entity | EntityAdd | EntityUpdate): string[] {
        throw new Error('Method not implemented.');
    }
    public _sort = (a: RoleEntity, b: RoleEntity): number =>
        a.name < b.name ? 1 : -1;

    public constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    public override convertModelUpdateToEntityUpdate$(
        model: RoleModelUpdate
    ): Observable<RoleEntityUpdate> {
        return super.convertModelUpdateToEntityUpdate$(model).pipe(
            map((entity) => entity as RoleEntityUpdate),
            switchMap((entity) => {
                if (model.editable) {
                    entity.editable = model.editable;
                }

                if (model.name) {
                    entity.name = model.name;
                }

                if (model.permissions) {
                    entity.permissions = model.permissions;
                }

                return of(entity);
            })
        );
    }

    public override createEntity(formGroup: FormGroup): RoleEntityAdd {
        const now = new Date().toISOString();

        return {
            editable: formGroup.value['editable'],
            meta: {
                creationDate: now,
                lastUpdated: now,
            },
            name: formGroup.value['name'],
            permissions: formGroup.value['permissions'],
        };
    }

    public override createFormGroup(role: RoleEntity | undefined): FormGroup {
        return this.formBuilder.group({
            editable: [role ? role?.editable : true],
            meta: [role?.meta],
            name: [role?.name, Validators.required],
            permissions: [role?.permissions],
            uid: [role?.uid],
        });
    }

    public override updateEntity(formGroup: FormGroup): RoleEntityUpdate {
        return {
            editable: formGroup.value['editable'],
            meta: formGroup.value['meta'],
            name: formGroup.value['name'],
            permissions: formGroup.value['permissions'],
            uid: formGroup.value['uid'],
        };
    }
}
