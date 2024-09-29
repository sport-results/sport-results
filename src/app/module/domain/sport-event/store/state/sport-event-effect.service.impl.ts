import { Injectable } from '@angular/core';
import { SportEventDataService, SportEventUtilService } from '@app/api/domain/sport-event';
import { EntityEffectServiceImpl } from '@app/core/entity';

@Injectable()
export class SportEventEffectServiceImpl extends EntityEffectServiceImpl {
    public constructor(
        sportEventDataService: SportEventDataService,
        sportEventUtilService: SportEventUtilService
    ) {
        super(sportEventDataService, sportEventUtilService);
    }
}
