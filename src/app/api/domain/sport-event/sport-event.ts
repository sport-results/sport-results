import { KeyValue } from '@angular/common';

import { Entity } from '../../core/entity';
import { SportCategoryRuleEntity } from '../sport-category-rule';
import { Participant } from '../sport-player';
import { SportCategoryEntitySimple } from '../sport-category';

export interface SportEvent {
    location: string | null;
    sportCategoryRule: SportCategoryRuleEntity;
    path: KeyValue<string, string>[];
}

export type SportEventEntity = SportEvent & Entity & {
  dateTime: Date;
  participants: Participant[];
  sportCategory: SportCategoryEntitySimple;
};

export type SportEventEntityAdd = Omit<SportEventEntity, 'uid'>;

export type SportEventEntityUpdate = Partial<SportEventEntity> & Entity;

export type SportEventModel = SportEvent & Entity & {
  dateTime: string;
  participants: Participant[];
  sportCategory: SportCategoryEntitySimple;
};

export type SportEventModelAdd = Omit<SportEventModel, 'uid'>;

export type SportEventModelUpdate = Partial<SportEventModel> & Entity;

export const SPORT_EVENT_FEATURE_KEY = 'sport-event';

export enum SportEventResourceEnum {
    SPORT_EVENT_ENTITY = 'SportEventEntity',
    SPORT_EVENT_ADMIN_PAGE = 'SportEventAdminPage',
    SPORT_EVENT_EDIT_PAGE  = 'SportEventEditPage',
    SPORT_EVENT_LIST_PAGE  = 'SportEventListPage',
}

export type SportEventEntitySimple = Omit<SportEventEntity, 'meta' | 'path'>;

export type SportEventModelSimple = Omit<SportEventModel, 'meta' | 'path'>;
