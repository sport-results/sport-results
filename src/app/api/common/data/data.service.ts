import { Observable } from 'rxjs';

import { KeyValue } from '@angular/common';

export abstract class DataService<R, S, T> {
    public abstract add$(entityAdd: S): Observable<R>;
    public abstract delete$(entity: R): Observable<R>;
    public abstract list$(
        pathParams: string[],
        queryParams: KeyValue<string, string>[]
    ): Observable<R[]>;
    public abstract listByIds$(ids: string[]): Observable<R[]>;
    public abstract load$(id: string): Observable<R | undefined>;
    public abstract update$(entityUpdate: T): Observable<T>;
}
