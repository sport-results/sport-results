import { EntityEffectService } from '../../core';
import { SportResultEntity, SportResultEntityAdd, SportResultEntityUpdate } from './sport-result';

export abstract class SportResultEffectService extends EntityEffectService<
    SportResultEntity,
    SportResultEntityAdd,
    SportResultEntityUpdate
> {}
