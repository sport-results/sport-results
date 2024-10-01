import { Observable } from 'rxjs';

import { EntityStoreService } from '../../core';
import { PermissionEntity, PermissionEntityAdd, PermissionEntityUpdate } from './permission';

export abstract class PermissionStoreService extends EntityStoreService<
    PermissionEntity,
    PermissionEntityAdd,
    PermissionEntityUpdate
> {
    public abstract dispatchChangeNewEntityButtonEnabled(
        enabled: boolean
    ): void;
    public abstract selectNewEntityButtonEnabled$(): Observable<boolean>;
}
