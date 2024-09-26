import { EntityDataService } from '../../core';
import { NetworkPlayerModel, NetworkPlayerModelAdd, NetworkPlayerModelUpdate } from './network-player';

export abstract class NetworkPlayerDataService extends EntityDataService<
    NetworkPlayerModel,
    NetworkPlayerModelAdd,
    NetworkPlayerModelUpdate
> {}
