import { EntityDataService } from '../../core';
import { SportPlayerModel, SportPlayerModelAdd, SportPlayerModelUpdate } from './sport-player';

export abstract class SportPlayerDataService extends EntityDataService<
    SportPlayerModel,
    SportPlayerModelAdd,
    SportPlayerModelUpdate
> {}
