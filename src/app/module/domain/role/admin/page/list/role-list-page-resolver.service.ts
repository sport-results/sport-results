import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { RoleStoreService } from '@app/api/domain/role';

@Injectable()
export class RoleListPageResolverService implements Resolve<void> {
    constructor(private roleStoreService: RoleStoreService) {}

    public resolve(): void {
        this.roleStoreService.dispatchChangeNewEntityButtonEnabled(true);
        this.roleStoreService.dispatchListEntitiesAction();
    }
}
