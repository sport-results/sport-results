import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { RoleStoreService } from '@app/api/domain/role';

@Injectable()
export class RoleEditPageResolverService implements Resolve<void> {
    public constructor(private roleStoreService: RoleStoreService) {}

    public resolve(): void | Observable<void> | Promise<void> {
        this.roleStoreService.dispatchChangeNewEntityButtonEnabled(false);
    }
}
