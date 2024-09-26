import { NetworkPlayerStoreService } from '@app/api/domain/network-player';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class NetworkPlayerListPageResolverService implements Resolve<void> {
    constructor(private networkPlayerStoreService: NetworkPlayerStoreService) {}

    public resolve(): void {
        this.networkPlayerStoreService.dispatchChangeNewEntityButtonEnabled(true);
        this.networkPlayerStoreService.dispatchListEntitiesAction();
    }
}
