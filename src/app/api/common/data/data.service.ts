import { Observable } from 'rxjs';

import { KeyValue } from '@angular/common';

import { SearchParam } from '../../core';

export abstract class DataService<R, S, T> {
  public abstract add$(entityAdd: S, subCollectionPath?: string): Observable<R>;
  public abstract delete$(uid: string, subCollectionPath?: string): Observable<string>;
  public abstract list$(
    subCollectionPath?: string,
    pathParams?: string[],
    queryParams?: KeyValue<string, string>[]
  ): Observable<R[]>;
  public abstract listByIds$(ids: string[]): Observable<R[]>;
  public abstract listByCollectionGroup$(ids?: string[]): Observable<R[]>;
  public abstract load$(id: string): Observable<R | undefined>;
  public abstract search$(params: SearchParam[]): Observable<R[]>;
  public abstract searchByCollectionGroup$(
    params: SearchParam[]
  ): Observable<R[]>;
  public abstract update$(
    entityUpdate: T,
    subCollectionPath?: string
  ): Observable<T>;
}
