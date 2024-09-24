import { Entity } from '../../core/entity';

export interface SportPlayer {
    name: string;
}

export type SportPlayerEntity = SportPlayer & Entity;

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
