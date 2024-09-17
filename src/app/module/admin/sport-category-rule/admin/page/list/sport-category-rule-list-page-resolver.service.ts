import { SportCategoryRuleStoreService } from '@app/api/domain/sport-category-rule';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class SportCategoryRuleListPageResolverService implements Resolve<void> {
    constructor(private sportCategoryRuleStoreService: SportCategoryRuleStoreService) {}

    public resolve(): void {
        this.sportCategoryRuleStoreService.dispatchChangeNewEntityButtonEnabled(true);
        this.sportCategoryRuleStoreService.dispatchListEntitiesAction();
    }
}
