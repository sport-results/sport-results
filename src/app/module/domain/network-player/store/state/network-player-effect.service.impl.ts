import { Injectable } from '@angular/core';
import { NetworkPlayerDataService, NetworkPlayerUtilService } from '@app/api/domain/network-player';
import { EntityEffectServiceImpl } from '@app/core/entity';

@Injectable()
export class NetworkPlayerEffectServiceImpl extends EntityEffectServiceImpl {
    public constructor(
        networkPlayerDataService: NetworkPlayerDataService,
        networkPlayerUtilService: NetworkPlayerUtilService
    ) {
        super(networkPlayerDataService, networkPlayerUtilService);
    }
}
