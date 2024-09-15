import { Entity } from '../../core/entity';

export interface SportCategory {
    name: string;
}

export type SportCategoryEntity = SportCategory & Entity;

export type SportCategoryEntityAdd = Omit<SportCategoryEntity, 'uid'>;

export type SportCategoryEntityUpdate = Partial<SportCategoryEntity> & Entity;

export type SportCategoryModel = SportCategory & Entity;

export type SportCategoryModelAdd = Omit<SportCategoryModel, 'uid'>;

export type SportCategoryModelUpdate = Partial<SportCategoryModel> & Entity;

export const SPORT_CATEGORY_FEATURE_KEY = 'sport-category';

export enum SportCategoryResourceEnum {
    SPORT_CATEGORY_ENTITY = 'SportCategoryEntity',
    SPORT_CATEGORY_ADMIN_PAGE = 'SportCategoryAdminPage',
    SPORT_CATEGORY_EDIT_PAGE  = 'SportCategoryEditPage',
    SPORT_CATEGORY_LIST_PAGE  = 'SportCategoryListPage',
} 
