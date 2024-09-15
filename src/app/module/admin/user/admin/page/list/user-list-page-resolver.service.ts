import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserStoreService } from '@app/api/domain/user';

@Injectable()
export class UserListPageResolverService implements Resolve<void> {
    constructor(private userStoreService: UserStoreService) {}

    public resolve(): void {
        this.userStoreService.dispatchChangeNewEntityButtonEnabled(true);
        this.userStoreService.dispatchListEntitiesAction();
    }
}
