import { map, Observable, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    NetworkPlayerEntity,
    NetworkPlayerEntityAdd,
    NetworkPlayerEntityUpdate,
    NetworkPlayerModelUpdate,
} from '@app/api/domain/network-player';
import { EntityUtilServiceImpl } from '@app/core/entity';
import { Entity, EntityAdd, EntityUpdate } from '@app/api/core/entity';

@Injectable()
export class NetworkPlayerUtilServiceImpl extends EntityUtilServiceImpl {
    public _sort = (a: NetworkPlayerEntity, b: NetworkPlayerEntity): number =>
        a.startDate < b.startDate ? 1 : -1;

    public constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    public override convertModelUpdateToEntityUpdate$(
        model: NetworkPlayerModelUpdate
    ): Observable<NetworkPlayerEntityUpdate> {
        return super.convertModelUpdateToEntityUpdate$(model).pipe(
            map((entity) => entity as NetworkPlayerEntityUpdate),
            switchMap((entity) => {
                if (model.startDate) {
                    entity.startDate = new Date(model.startDate);
                }

                return of(entity);
            })
        );
    }

     public override createEntity(formGroup: FormGroup): EntityAdd {
        throw new Error('Method not implemented.');
    }
    public override createEntitySearchParameter(entity: Entity | EntityAdd | EntityUpdate): string[] {
        throw new Error('Method not implemented.');
    }
    public override createFormGroup(entity: Entity | undefined): FormGroup {
        throw new Error('Method not implemented.');
    }
    public override updateEntity(formGroup: FormGroup): EntityUpdate {
        throw new Error('Method not implemented.');
    }
}
