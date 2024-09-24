import { EntityEffectService } from '../../core';
import { SportPlayerEntity, SportPlayerEntityAdd, SportPlayerEntityUpdate } from './sport-player';

export abstract class SportPlayerEffectService extends EntityEffectService<
    SportPlayerEntity,
    SportPlayerEntityAdd,
    SportPlayerEntityUpdate
> {}
