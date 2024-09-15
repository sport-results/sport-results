import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { RoleStoreService } from '@app/api/domain/role';
import { UserStoreService } from '@app/api/domain/user';

@Injectable()
export class UserEditPageResolverService implements Resolve<void> {
    public constructor(
        private roleStoreService: RoleStoreService,
        private userStoreService: UserStoreService
    ) {}

    public resolve(): void | Observable<void> | Promise<void> {
        this.userStoreService.dispatchChangeNewEntityButtonEnabled(false);
        this.roleStoreService.dispatchListEntitiesAction();
    }
}
