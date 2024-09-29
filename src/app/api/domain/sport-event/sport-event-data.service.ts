import { EntityDataService } from '../../core';
import { SportEventModel, SportEventModelAdd, SportEventModelUpdate } from './sport-event';

export abstract class SportEventDataService extends EntityDataService<
    SportEventModel,
    SportEventModelAdd,
    SportEventModelUpdate
> {}
