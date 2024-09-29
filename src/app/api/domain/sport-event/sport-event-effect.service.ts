import { EntityEffectService } from '../../core';
import { SportEventEntity, SportEventEntityAdd, SportEventEntityUpdate } from './sport-event';

export abstract class SportEventEffectService extends EntityEffectService<
    SportEventEntity,
    SportEventEntityAdd,
    SportEventEntityUpdate
> {}
