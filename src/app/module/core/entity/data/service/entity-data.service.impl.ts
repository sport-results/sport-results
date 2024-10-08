import { catchError, Observable, of } from 'rxjs';

import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  EntityDataService,
  EntityModel,
  EntityModelAdd,
  EntityModelUpdate,
} from '@app/api/core/entity';
import { DataEngine } from '@app/api/engine';
import { SearchParams } from '@app/api/core/search';

@Injectable()
export abstract class EntityDataServiceImpl extends EntityDataService<
  EntityModel,
  EntityModelAdd,
  EntityModelUpdate
> {
  public constructor(protected dataEngine: DataEngine) {
    super();
  }

  public override add$(
    entityAdd: EntityModelAdd,
    subCollectionPath?: string
  ): Observable<EntityModel> {
    return this.dataEngine.add$(entityAdd, subCollectionPath);
  }

  public override delete$(uid: string, subCollectionPath?: string): Observable<string> {
    return this.dataEngine.delete$(uid, subCollectionPath);
  }

  public override list$(
    subCollectionPath?: string,
    pathParams?: string[],
    queryParams?: KeyValue<string, string>[]
  ): Observable<EntityModel[]> {
    return this.dataEngine.list$(subCollectionPath, pathParams, queryParams);
  }

  public override listByIds$(ids: string[]): Observable<EntityModel[]> {
    return this.dataEngine.listByIds$(ids);
  }

  public override listByCollectionGroup$(
    ids?: string[]
  ): Observable<EntityModel[]> {
    return this.dataEngine.listByCollectionGroup$(ids);
  }

  public override load$(id: string): Observable<EntityModel | undefined> {
    return this.dataEngine.load$(id).pipe(
      catchError((error) => {
        console.log(error);

        return of(error);
      })
    );
  }

  public override search$(params: SearchParams): Observable<EntityModel[]> {
    return this.dataEngine.search$(params);
  }

  public override searchByCollectionGroup$(params: SearchParams): Observable<EntityModel[]> {
    return this.dataEngine.searchByCollectionGroup$(params);
  }

  public override update$(
    entityUpdate: EntityModelUpdate,
    subCollectionPath?: string
  ): Observable<EntityModelUpdate> {
    return this.dataEngine.update$(entityUpdate, subCollectionPath);
  }
}
