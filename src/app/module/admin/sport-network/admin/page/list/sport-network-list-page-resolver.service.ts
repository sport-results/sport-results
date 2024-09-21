import { SportNetworkStoreService } from '@app/api/domain/sport-network';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class SportNetworkListPageResolverService implements Resolve<void> {
    constructor(private sportNetworkStoreService: SportNetworkStoreService) {}

    public resolve(): void {
        this.sportNetworkStoreService.dispatchChangeNewEntityButtonEnabled(true);
        this.sportNetworkStoreService.dispatchListEntitiesAction();
    }
}
