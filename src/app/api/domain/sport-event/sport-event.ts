import { Entity } from '../../core/entity';

export interface SportEvent {
    name: string;
}

export type SportEventEntity = SportEvent & Entity;

export type SportEventEntityAdd = Omit<SportEventEntity, 'uid'>;

export type SportEventEntityUpdate = Partial<SportEventEntity> & Entity;

export type SportEventModel = SportEvent & Entity;

export type SportEventModelAdd = Omit<SportEventModel, 'uid'>;

export type SportEventModelUpdate = Partial<SportEventModel> & Entity;

export const SPORT_EVENT_FEATURE_KEY = 'sport-event';

export enum SportEventResourceEnum {
    SPORT_EVENT_ENTITY = 'SportEventEntity',
    SPORT_EVENT_ADMIN_PAGE = 'SportEventAdminPage',
    SPORT_EVENT_EDIT_PAGE  = 'SportEventEditPage',
    SPORT_EVENT_LIST_PAGE  = 'SportEventListPage',
} 
