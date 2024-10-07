import { KeyValue } from '@angular/common';
import { EntityUtilService } from '../../core';
import { SportCategoryEntitySimple } from '../sport-category';
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
    sportCategories: SportCategoryEntitySimple[],
    user: UserEntity,
    path: KeyValue<string, string>[],
  ): SportNetworkEntityAdd;

  public abstract createPath(
    userId: string,
  ): KeyValue<string, string>[];
}
