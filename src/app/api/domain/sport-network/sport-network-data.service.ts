import { EntityDataService } from '../../core';
import { SportNetworkModel, SportNetworkModelAdd, SportNetworkModelUpdate } from './sport-network';

export abstract class SportNetworkDataService extends EntityDataService<
    SportNetworkModel,
    SportNetworkModelAdd,
    SportNetworkModelUpdate
> {}
