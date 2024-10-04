import { KeyValue } from '@angular/common';
import { Observable } from 'rxjs';

import { SearchParams } from '../search';

export abstract class EntityEffectService<R, S, T> {
  public abstract addEntity$(
    entityAdd: S,
    subCollectionPath?: string
  ): Observable<R>;
  public abstract listEntities$(
    subCollectionPath?: string,
    pathParams?: string[],
    queryParams?: KeyValue<string, string>[]
  ): Observable<R[]>;
  public abstract listEntitiesByCollectionGroup$(
    ids?: string[]
  ): Observable<R[]>;
  public abstract listEntitiesByIds$(ids: string[]): Observable<R[]>;
  public abstract loadEntity$(entityId: string): Observable<R>;
  public abstract searchEntities$(params: SearchParams): Observable<R[]>;
  public abstract searchEntitiesByCollectionGroup$(
    params: SearchParams
  ): Observable<R[]>;
  public abstract updateEntity$(
    entityUpdate: T,
    subCollectionPath?: string
  ): Observable<T>;
}
