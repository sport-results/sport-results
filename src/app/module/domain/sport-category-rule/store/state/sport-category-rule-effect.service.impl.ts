import { Injectable } from '@angular/core';
import { SportCategoryRuleDataService, SportCategoryRuleUtilService } from '@app/api/domain/sport-category-rule';
import { EntityEffectServiceImpl } from '@app/core/entity';

@Injectable()
export class SportCategoryRuleEffectServiceImpl extends EntityEffectServiceImpl {
    public constructor(
        sportCategoryRuleDataService: SportCategoryRuleDataService,
        sportCategoryRuleUtilService: SportCategoryRuleUtilService
    ) {
        super(sportCategoryRuleDataService, sportCategoryRuleUtilService);
    }
}
