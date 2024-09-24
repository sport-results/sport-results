import { EntityUtilService } from '../../core';
import {
    SportPlayerEntity,
    SportPlayerEntityAdd,
    SportPlayerEntityUpdate,
    SportPlayerModel,
    SportPlayerModelAdd,
    SportPlayerModelUpdate
} from './sport-player';

export abstract class SportPlayerUtilService extends EntityUtilService<
    SportPlayerEntity,
    SportPlayerEntityAdd,
    SportPlayerEntityUpdate,
    SportPlayerModel,
    SportPlayerModelAdd,
    SportPlayerModelUpdate
> {}
