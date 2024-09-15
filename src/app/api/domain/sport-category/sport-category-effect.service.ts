import { EntityEffectService } from '../../core';
import { SportCategoryEntity, SportCategoryEntityAdd, SportCategoryEntityUpdate } from './sport-category';

export abstract class SportCategoryEffectService extends EntityEffectService<
    SportCategoryEntity,
    SportCategoryEntityAdd,
    SportCategoryEntityUpdate
> {}
