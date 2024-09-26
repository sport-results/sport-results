import { EntityUtilService } from '../../core';
import {
    NetworkPlayerEntity,
    NetworkPlayerEntityAdd,
    NetworkPlayerEntityUpdate,
    NetworkPlayerModel,
    NetworkPlayerModelAdd,
    NetworkPlayerModelUpdate
} from './network-player';

export abstract class NetworkPlayerUtilService extends EntityUtilService<
    NetworkPlayerEntity,
    NetworkPlayerEntityAdd,
    NetworkPlayerEntityUpdate,
    NetworkPlayerModel,
    NetworkPlayerModelAdd,
    NetworkPlayerModelUpdate
> {}
