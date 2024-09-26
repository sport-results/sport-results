import { Entity } from '../../core/entity';
import { SportNetworkEntity } from '../sport-network';
import { SportPlayerEntity } from '../sport-player';

export interface NetworkPlayer {
  sportNetworkId: string;
}

export type NetworkPlayerEntity = NetworkPlayer &
  Entity & {
    sportPlayer: SportPlayerEntity;
    startDate: Date;
    endDate: Date | null;
  };;

export type NetworkPlayerEntityAdd = Omit<NetworkPlayerEntity, 'uid'>;

export type NetworkPlayerEntityUpdate = Partial<NetworkPlayerEntity> & Entity;

export type NetworkPlayerModel = Entity & NetworkPlayer & {
    sportPlayerId: string;
    startDate: string;
    endDate: string | null;
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
