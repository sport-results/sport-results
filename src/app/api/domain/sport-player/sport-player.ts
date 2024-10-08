import { Identifiable } from '@app/api/common';
import { Entity, EntityHelper } from '../../core/entity';
import { SportCategoryEntitySimple } from '../sport-category';

export interface Participant extends Identifiable {
  name: string;
}
export type SportPlayer = Participant & EntityHelper & {
    userId: string | null;
    skills: SportCategoryEntitySimple[];
}

export type SportPlayerEntity = SportPlayer ;

export type SportPlayerEntityAdd = Omit<SportPlayerEntity, 'uid'>;

export type SportPlayerEntityUpdate = Partial<SportPlayerEntity> & Entity;

export type SportPlayerModel = SportPlayer & Entity;

export type SportPlayerModelAdd = Omit<SportPlayerModel, 'uid'>;

export type SportPlayerModelUpdate = Partial<SportPlayerModel> & Entity;

export const SPORT_PLAYER_FEATURE_KEY = 'sport-player';

export enum SportPlayerResourceEnum {
    SPORT_PLAYER_ENTITY = 'SportPlayerEntity',
    SPORT_PLAYER_ADMIN_PAGE = 'SportPlayerAdminPage',
    SPORT_PLAYER_EDIT_PAGE  = 'SportPlayerEditPage',
    SPORT_PLAYER_LIST_PAGE  = 'SportPlayerListPage',
}

export type SportPlayerEntitySimple = Omit<SportPlayerEntity, 'meta'>;

export type SportPlayerModelSimple = Omit<SportPlayerModel, 'meta'>;