import { PermissionStoreService } from '@app/api/domain/permission';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class PermissionListPageResolverService implements Resolve<void> {
    constructor(private permissionStoreService: PermissionStoreService) {}

    public resolve(): void {
        this.permissionStoreService.dispatchChangeNewEntityButtonEnabled(true);
        this.permissionStoreService.dispatchListEntitiesAction();
    }
}
