import { EntityEffectService } from '../../core';
import { SportNetworkEntity, SportNetworkEntityAdd, SportNetworkEntityUpdate } from './sport-network';

export abstract class SportNetworkEffectService extends EntityEffectService<
    SportNetworkEntity,
    SportNetworkEntityAdd,
    SportNetworkEntityUpdate
> {}
