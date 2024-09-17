import { Entity } from '../../core/entity';

export interface SportCategoryRule {
    name: string;
}

export type SportCategoryRuleEntity = SportCategoryRule & Entity;

export type SportCategoryRuleEntityAdd = Omit<SportCategoryRuleEntity, 'uid'>;

export type SportCategoryRuleEntityUpdate = Partial<SportCategoryRuleEntity> & Entity;

export type SportCategoryRuleModel = SportCategoryRule & Entity;

export type SportCategoryRuleModelAdd = Omit<SportCategoryRuleModel, 'uid'>;

export type SportCategoryRuleModelUpdate = Partial<SportCategoryRuleModel> & Entity;

export const SPORT_CATEGORY_RULE_FEATURE_KEY = 'sport-category-rule';

export enum SportCategoryRuleResourceEnum {
    SPORT_CATEGORY_RULE_ENTITY = 'SportCategoryRuleEntity',
    SPORT_CATEGORY_RULE_ADMIN_PAGE = 'SportCategoryRuleAdminPage',
    SPORT_CATEGORY_RULE_EDIT_PAGE  = 'SportCategoryRuleEditPage',
    SPORT_CATEGORY_RULE_LIST_PAGE  = 'SportCategoryRuleListPage',
} 
