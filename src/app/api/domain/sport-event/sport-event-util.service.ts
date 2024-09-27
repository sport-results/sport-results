import { EntityUtilService } from '../../core';
import {
    SportEventEntity,
    SportEventEntityAdd,
    SportEventEntityUpdate,
    SportEventModel,
    SportEventModelAdd,
    SportEventModelUpdate
} from './sport-event';

export abstract class SportEventUtilService extends EntityUtilService<
    SportEventEntity,
    SportEventEntityAdd,
    SportEventEntityUpdate,
    SportEventModel,
    SportEventModelAdd,
    SportEventModelUpdate
> {}
