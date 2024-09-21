import { Injectable } from '@angular/core';
import { SportNetworkDataService, SportNetworkUtilService } from '@app/api/domain/sport-network';
import { EntityEffectServiceImpl } from '@app/core/entity';

@Injectable()
export class SportNetworkEffectServiceImpl extends EntityEffectServiceImpl {
    public constructor(
        sportNetworkDataService: SportNetworkDataService,
        sportNetworkUtilService: SportNetworkUtilService
    ) {
        super(sportNetworkDataService, sportNetworkUtilService);
    }
}
