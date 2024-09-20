import { Observable } from 'rxjs';

import { KeyValue } from '@angular/common';

export abstract class EntityEffectService<R, S, T> {
    public abstract addEntity$(entityAdd: S): Observable<R>;
    public abstract addEntityToParent$(entityAdd: S, subCollectionPath: string): Observable<R>;
    public abstract listEntities$(
        pathParams: string[],
        queryParams: KeyValue<string, string>[]
    ): Observable<R[]>;
    public abstract loadEntity$(entityId: string): Observable<R>;
    public abstract updateEntity$(entityUpdate: T): Observable<T>;
}
