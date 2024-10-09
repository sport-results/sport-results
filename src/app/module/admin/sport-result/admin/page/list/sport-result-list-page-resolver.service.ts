import { SportResultStoreService } from '@app/api/domain/sport-result';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class SportResultListPageResolverService implements Resolve<void> {
    constructor(private sportResultStoreService: SportResultStoreService) {}

    public resolve(): void {
        this.sportResultStoreService.dispatchChangeNewEntityButtonEnabled(true);
        this.sportResultStoreService.dispatchListEntitiesAction();
    }
}
