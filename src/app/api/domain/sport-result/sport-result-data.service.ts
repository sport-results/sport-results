import { EntityDataService } from '../../core';
import { SportResultModel, SportResultModelAdd, SportResultModelUpdate } from './sport-result';

export abstract class SportResultDataService extends EntityDataService<
    SportResultModel,
    SportResultModelAdd,
    SportResultModelUpdate
> {}
