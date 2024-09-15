import { SportCategoryStoreService } from '@app/api/domain/sport-category';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class SportCategoryListPageResolverService implements Resolve<void> {
    constructor(private sportCategoryStoreService: SportCategoryStoreService) {}

    public resolve(): void {
        this.sportCategoryStoreService.dispatchChangeNewEntityButtonEnabled(true);
        this.sportCategoryStoreService.dispatchListEntitiesAction();
    }
}
