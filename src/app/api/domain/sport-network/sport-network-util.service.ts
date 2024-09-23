import { EntityUtilService } from '../../core';
import { SportCategorySimple } from '../sport-category';
import { UserEntity } from '../user';
import {
  SportNetworkEntity,
  SportNetworkEntityAdd,
  SportNetworkEntityUpdate,
  SportNetworkModel,
  SportNetworkModelAdd,
  SportNetworkModelUpdate,
} from './sport-network';

export abstract class SportNetworkUtilService extends EntityUtilService<
  SportNetworkEntity,
  SportNetworkEntityAdd,
  SportNetworkEntityUpdate,
  SportNetworkModel,
  SportNetworkModelAdd,
  SportNetworkModelUpdate
> {
  public abstract createDefaultSportNetwork(
    sportCategories: SportCategorySimple[],
    user: UserEntity
  ): SportNetworkEntityAdd;
}
