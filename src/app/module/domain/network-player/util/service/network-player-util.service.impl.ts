import {
  combineLatest,
  filter,
  first,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NetworkPlayerEntity,
  NetworkPlayerEntityAdd,
  NetworkPlayerEntityUpdate,
  NetworkPlayerModel,
  NetworkPlayerModelAdd,
  NetworkPlayerModelUpdate,
} from '@app/api/domain/network-player';
import { EntityUtilServiceImpl } from '@app/core/entity';
import {
  Entity,
  EntityAdd,
  EntityModelAdd,
  EntityUpdate,
  SimpleEntity,
  SimpleModel,
} from '@app/api/core/entity';
import { SportPlayerStoreService } from '@app/api/domain/sport-player';

@Injectable()
export class NetworkPlayerUtilServiceImpl extends EntityUtilServiceImpl {
  public override createSimpleEntity(model: SimpleModel): SimpleEntity {
    throw new Error('Method not implemented.');
  }
  public override createSimpleModel(entity: SimpleEntity): SimpleModel {
    throw new Error('Method not implemented.');
  }
  private sportPlayerStoreService = inject(SportPlayerStoreService);
  public _sort = (a: NetworkPlayerEntity, b: NetworkPlayerEntity): number =>
    a.startDate < b.startDate ? 1 : -1;

  public constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  public override convertEntityAddToModelAdd(
    entity: NetworkPlayerEntityAdd
  ): NetworkPlayerModelAdd {
    return {
      meta: entity.meta,
      sportNetworkId: entity.sportNetworkId,
      sportPlayerId: entity.sportPlayer.uid,
      startDate: entity.startDate.toISOString(),
      endDate: entity.endDate ? entity.endDate.toISOString() : null,
    };
  }

  public override convertModelToEntity$(
    model: NetworkPlayerModel
  ): Observable<NetworkPlayerEntity> {
    return this.sportPlayerStoreService
      .selectEntityById$(model.sportPlayerId)
      .pipe(
        tap(
          (sportPlayer) =>
            !sportPlayer &&
            this.sportPlayerStoreService.dispatchLoadEntityAction(
              model.sportPlayerId
            )
        ),
        filter((sportPlayer) => !!sportPlayer),
        first(),
        map((sportPlayer) => {
          return {
            meta: model.meta,
            endDate: model.endDate ? new Date(model.endDate) : null,
            startDate: new Date(model.startDate),
            sportNetworkId: model.sportNetworkId,
            sportPlayer,
            uid: model.uid,
          };
        })
      );
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
  public override createEntitySearchParameter(
    entity: Entity | EntityAdd | EntityUpdate
  ): string[] {
    throw new Error('Method not implemented.');
  }
  public override createFormGroup(entity: Entity | undefined): FormGroup {
    throw new Error('Method not implemented.');
  }
  public override updateEntity(formGroup: FormGroup): EntityUpdate {
    throw new Error('Method not implemented.');
  }
}
