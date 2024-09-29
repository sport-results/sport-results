import { Entity } from '../../core/entity';
import { SportCategoryEntity, SportCategorySimple } from '../sport-category';
import { SportCategoryRuleEntity } from '../sport-category-rule';
import { Participant } from '../sport-player';

export interface SportEvent {
    location: string | null;
    sportCategoryRule: SportCategoryRuleEntity
}

export type SportEventEntity = SportEvent & Entity & {
  dateTime: Date;
  participants: Participant[];
  sportCategory: SportCategorySimple;
};

export type SportEventEntityAdd = Omit<SportEventEntity, 'uid'>;

export type SportEventEntityUpdate = Partial<SportEventEntity> & Entity;

export type SportEventModel = SportEvent & Entity & {
  dateTime: string;
  participantIds: string[];
  sportCategory: SportCategorySimple;
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
