import { KeyValue } from '@angular/common';
import { Entity } from '../../core/entity';
import { SportCategoryEntitySimple } from '../sport-category';

export interface SportNetwork {
    name: string;
    path: KeyValue<string, string>[];
    sportCategories: SportCategoryEntitySimple[]
    userId: string;
}

export type SportNetworkEntity = SportNetwork & Entity;

export type SportNetworkEntityAdd = Omit<SportNetworkEntity, 'uid'>;

export type SportNetworkEntityUpdate = Partial<SportNetworkEntity> & Entity;

export type SportNetworkModel = SportNetwork & Entity;

export type SportNetworkModelAdd = Omit<SportNetworkModel, 'uid'>;

export type SportNetworkModelUpdate = Partial<SportNetworkModel> & Entity;

export const SPORT_NETWORK_FEATURE_KEY = 'sport-network';

export enum SportNetworkResourceEnum {
    SPORT_NETWORK_ENTITY = 'SportNetworkEntity',
    SPORT_NETWORK_ADMIN_PAGE = 'SportNetworkAdminPage',
    SPORT_NETWORK_EDIT_PAGE  = 'SportNetworkEditPage',
    SPORT_NETWORK_LIST_PAGE  = 'SportNetworkListPage',
}
