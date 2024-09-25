import { Entity } from '../../core/entity';

export interface NetworkPlayer {
  newtworkId: string;
  playerId: string;
}

export type NetworkPlayerEntity = NetworkPlayer &
  Entity & {
    startDate: Date;
    endDate?: Date;
  };

export type NetworkPlayerEntityAdd = Omit<NetworkPlayerEntity, 'uid'>;

export type NetworkPlayerEntityUpdate = Partial<NetworkPlayerEntity> & Entity;

export type NetworkPlayerModel = NetworkPlayer & Entity & {
    startDate: string;
    endDate?: string;
};

export type NetworkPlayerModelAdd = Omit<NetworkPlayerModel, 'uid'>;

export type NetworkPlayerModelUpdate = Partial<NetworkPlayerModel> & Entity;

export const NETWORK_PLAYER_FEATURE_KEY = 'network-player';

export enum NetworkPlayerResourceEnum {
  NETWORK_PLAYER_ENTITY = 'NetworkPlayerEntity',
  NETWORK_PLAYER_ADMIN_PAGE = 'NetworkPlayerAdminPage',
  NETWORK_PLAYER_EDIT_PAGE = 'NetworkPlayerEditPage',
  NETWORK_PLAYER_LIST_PAGE = 'NetworkPlayerListPage',
}
