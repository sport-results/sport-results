import { EntityUtilService } from '../../core';
import {
    SportNetworkEntity,
    SportNetworkEntityAdd,
    SportNetworkEntityUpdate,
    SportNetworkModel,
    SportNetworkModelAdd,
    SportNetworkModelUpdate
} from './sport-network';

export abstract class SportNetworkUtilService extends EntityUtilService<
    SportNetworkEntity,
    SportNetworkEntityAdd,
    SportNetworkEntityUpdate,
    SportNetworkModel,
    SportNetworkModelAdd,
    SportNetworkModelUpdate
> {}
