import { SportEventStoreService } from '@app/api/domain/sport-event';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class SportEventListPageResolverService implements Resolve<void> {
    constructor(private sportEventStoreService: SportEventStoreService) {}

    public resolve(): void {
        this.sportEventStoreService.dispatchChangeNewEntityButtonEnabled(true);
        this.sportEventStoreService.dispatchListEntitiesAction();
    }
}
