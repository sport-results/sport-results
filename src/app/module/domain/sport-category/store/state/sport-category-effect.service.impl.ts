import { Injectable } from '@angular/core';
import { SportCategoryDataService, SportCategoryUtilService } from '@app/api/domain/sport-category';
import { EntityEffectServiceImpl } from '@app/core/entity';

@Injectable()
export class SportCategoryEffectServiceImpl extends EntityEffectServiceImpl {
    public constructor(
        sportCategoryDataService: SportCategoryDataService,
        sportCategoryUtilService: SportCategoryUtilService
    ) {
        super(sportCategoryDataService, sportCategoryUtilService);
    }
}
