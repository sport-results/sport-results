import { EntityUtilService } from '../../core';
import {
    SportResultEntity,
    SportResultEntityAdd,
    SportResultEntityUpdate,
    SportResultModel,
    SportResultModelAdd,
    SportResultModelUpdate
} from './sport-result';

export abstract class SportResultUtilService extends EntityUtilService<
    SportResultEntity,
    SportResultEntityAdd,
    SportResultEntityUpdate,
    SportResultModel,
    SportResultModelAdd,
    SportResultModelUpdate
> {}
