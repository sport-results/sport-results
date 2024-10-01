import { exhaustMap, forkJoin, mergeMap, Observable, of, switchMap } from 'rxjs';

import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  Entity,
  EntityAdd,
  EntityDataService,
  EntityEffectService,
  EntityModel,
  EntityModelAdd,
  EntityModelUpdate,
  EntityUpdate,
  EntityUtilService,
} from '@app/api/core/entity';
import { SearchParams } from '@app/api/core/search';

@Injectable()
export class EntityEffectServiceImpl extends EntityEffectService<
  Entity,
  EntityAdd,
  EntityUpdate
> {
  protected entityDataService: EntityDataService<
    EntityModel,
    EntityModelAdd,
    EntityModelUpdate
  >;
  protected entityUtilService: EntityUtilService<
    Entity,
    EntityAdd,
    EntityUpdate,
    EntityModel,
    EntityModelAdd,
    EntityModelUpdate
  >;

  public constructor(
    entityDataService: EntityDataService<
      EntityModel,
      EntityModelAdd,
      EntityModelUpdate
    >,
    entityUtilService: EntityUtilService<
      Entity,
      EntityAdd,
      EntityUpdate,
      EntityModel,
      EntityModelAdd,
      EntityModelUpdate
    >
  ) {
    super();

    this.entityDataService = entityDataService;
    this.entityUtilService = entityUtilService;
  }

  public addEntity$(
    entityAdd: EntityAdd,
    subCollectionPath?: string
  ): Observable<Entity> {
    return this.entityDataService
      .add$(
        this.entityUtilService.convertEntityAddToModelAdd(entityAdd),
        subCollectionPath
      )
      .pipe(
        switchMap((model) =>
          this.entityUtilService.convertModelToEntity$(model)
        )
      );
  }

  public override listEntities$(
    subCollectionPath?: string,
    pathParams?: string[],
    queryParams?: KeyValue<string, string>[]
  ): Observable<Entity[]> {
    return this.entityDataService
      .list$(subCollectionPath, pathParams, queryParams)
      .pipe(
        exhaustMap((models) => {
          const x =
            models && models.length
              ? forkJoin(
                  models.map((model) =>
                    this.entityUtilService.convertModelToEntity$(model)
                  )
                )
              : of(models as Entity[]);

          return x;
        })
      );
  }

  public listGroupEntities$(ids?: string[]): Observable<Entity[]> {
    return this.entityDataService
      .listByGroup$(ids)
      .pipe(
        mergeMap((models) =>
          models && models.length
            ? forkJoin(
                models.map((model) =>
                  this.entityUtilService.convertModelToEntity$(model)
                )
              )
            : of(models as Entity[])
        )
      );
  }

  public searchEntities$(params: SearchParams): Observable<Entity[]> {
    return this.entityDataService
      .search$(params)
      .pipe(
        switchMap((result) =>
          forkJoin(
            result.map((document) =>
              this.entityUtilService.convertModelToEntity$(document)
            )
          )
        )
      );
  }

  public loadEntity$(entityId: string): Observable<Entity> {
    return this.entityDataService
      .load$(entityId)
      .pipe(
        switchMap((model) =>
          this.entityUtilService.convertModelToEntity$(model as EntityModel)
        )
      );
  }

  public updateEntity$(
    entityUpdate: EntityUpdate,
    subCollectionPath?: string
  ): Observable<EntityUpdate> {
    return this.entityDataService
      .update$(
        this.entityUtilService.convertEntityUpdateToModelUpdate(entityUpdate),
        subCollectionPath
      )
      .pipe(
        switchMap((modelUpdate) =>
          this.entityUtilService.convertModelUpdateToEntityUpdate$(modelUpdate)
        )
      );
  }
}
