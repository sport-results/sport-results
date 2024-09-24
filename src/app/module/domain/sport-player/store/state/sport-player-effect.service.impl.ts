import { Injectable } from '@angular/core';
import { SportPlayerDataService, SportPlayerUtilService } from '@app/api/domain/sport-player';
import { EntityEffectServiceImpl } from '@app/core/entity';

@Injectable()
export class SportPlayerEffectServiceImpl extends EntityEffectServiceImpl {
    public constructor(
        sportPlayerDataService: SportPlayerDataService,
        sportPlayerUtilService: SportPlayerUtilService
    ) {
        super(sportPlayerDataService, sportPlayerUtilService);
    }
}
