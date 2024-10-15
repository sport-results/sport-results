import { KeyValue } from '@angular/common';

import { Entity } from '../../core/entity';
import { SportCategoryRuleEntitySimple, SportCategoryRuleModelSimple } from '../sport-category-rule';

export interface SportResult {
    path: KeyValue<string, string>[];
    periodResults: PeriodResult[];
}

export type SportResultEntity = SportResult & Entity & {
  sportCategoryRule: SportCategoryRuleEntitySimple;
};

export type SportResultEntityAdd = Omit<SportResultEntity, 'uid'>;

export type SportResultEntityUpdate = Partial<SportResultEntity> & Entity;

export type SportResultModel = SportResult & Entity & {
  sportCategoryRule: SportCategoryRuleModelSimple;
};

export type SportResultModelAdd = Omit<SportResultModel, 'uid'>;

export type SportResultModelUpdate = Partial<SportResultModel> & Entity;

export const SPORT_RESULT_FEATURE_KEY = 'sport-result';

export enum SportResultResourceEnum {
    SPORT_RESULT_ENTITY = 'SportResultEntity',
    SPORT_RESULT_ADMIN_PAGE = 'SportResultAdminPage',
    SPORT_RESULT_EDIT_PAGE  = 'SportResultEditPage',
    SPORT_RESULT_LIST_PAGE  = 'SportResultListPage',
}

export type SportResultEntitySimple = Omit<SportResultEntity, 'meta' | 'path'>;

export type SportResultModelSimple = Omit<SportResultModel, 'meta' | 'path'>;

export type PeriodResult = {
  index: number;
  results: KeyValue<string, number>[];
}
