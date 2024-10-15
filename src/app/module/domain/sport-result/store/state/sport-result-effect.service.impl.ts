import { Injectable } from '@angular/core';
import { SportResultDataService, SportResultUtilService } from '@app/api/domain/sport-result';
import { EntityEffectServiceImpl } from '@app/core/entity';

@Injectable()
export class SportResultEffectServiceImpl extends EntityEffectServiceImpl {
    public constructor(
        sportResultDataService: SportResultDataService,
        sportResultUtilService: SportResultUtilService
    ) {
        super(sportResultDataService, sportResultUtilService);
    }
}
