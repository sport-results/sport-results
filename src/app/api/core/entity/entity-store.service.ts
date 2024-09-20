import { Observable } from 'rxjs';

import { KeyValue } from '@angular/common';

import { StoreService } from '../store';

export abstract class EntityStoreService<R, S, T> extends StoreService {
    public dispatchDeleteEntityAction(entity: R): void {
        throw new Error('Method not implemented.');
    }

    public dispatchLoadEntitiesByIdsAction(ids: string[]): void {
        throw new Error('Method not implemented.');
    }

    public dispatchLoadEntityAction(id: string): void {
        throw new Error('Method not implemented.');
    }

    public dispatchSetSelectedEntityIdAction(entityId: string): void {
        throw new Error('Method not implemented.');
    }

    public selectEntityById$(entityId: string): Observable<R | undefined> {
        throw new Error('Method not implemented.');
    }

    public selectSelectedEntityId$(): Observable<string> {
        throw new Error('Method not implemented.');
    }

    public abstract dispatchAddEntityAction(entity: S, parentEntityId?: string): void;
    public abstract dispatchListEntitiesAction(
        subCollectionPath?: string,
        pathParams?: string[],
        queryParams?: KeyValue<string, string>[]
    ): void;
    public abstract dispatchUpdateEntityAction(entity: T): void;
    public abstract selectEntities$(): Observable<R[]>;
    public abstract selectSelectedEntity$(): Observable<R | null>;
}
