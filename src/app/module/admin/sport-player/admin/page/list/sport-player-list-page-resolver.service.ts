import { SportPlayerStoreService } from '@app/api/domain/sport-player';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class SportPlayerListPageResolverService implements Resolve<void> {
    constructor(private sportPlayerStoreService: SportPlayerStoreService) {}

    public resolve(): void {
        this.sportPlayerStoreService.dispatchChangeNewEntityButtonEnabled(true);
        this.sportPlayerStoreService.dispatchListEntitiesAction();
    }
}
