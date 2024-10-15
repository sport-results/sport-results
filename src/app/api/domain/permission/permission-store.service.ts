import { Observable } from 'rxjs';

import { EntityStoreService, SearchParam } from '../../core';
import {
  PermissionEntity,
  PermissionEntityAdd,
  PermissionEntityUpdate,
} from './permission';

export abstract class PermissionStoreService extends EntityStoreService<
  PermissionEntity,
  PermissionEntityAdd,
  PermissionEntityUpdate
> {
  public abstract dispatchChangeNewEntityButtonEnabled(enabled: boolean): void;
  public abstract dispatchSearchEntitiesByCollectionGroupAction(
    searchParams: SearchParam[]
  ): void;
  public abstract selectNewEntityButtonEnabled$(): Observable<boolean>;
  public abstract selectEntitiesByResourceId$(
    resourceId: string
  ): Observable<PermissionEntity[]>;
  public abstract selectEntitiesByUserId$(
    userId: string
  ): Observable<PermissionEntity[]>
}
