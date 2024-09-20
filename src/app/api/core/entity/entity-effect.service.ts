import { Observable } from 'rxjs';

import { KeyValue } from '@angular/common';

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
  public abstract loadEntity$(entityId: string): Observable<R>;
  public abstract updateEntity$(
    entityUpdate: T,
    subCollectionPath?: string
  ): Observable<T>;
}
