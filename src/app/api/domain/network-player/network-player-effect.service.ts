import { EntityEffectService } from '../../core';
import { NetworkPlayerEntity, NetworkPlayerEntityAdd, NetworkPlayerEntityUpdate } from './network-player';

export abstract class NetworkPlayerEffectService extends EntityEffectService<
    NetworkPlayerEntity,
    NetworkPlayerEntityAdd,
    NetworkPlayerEntityUpdate
> {}
