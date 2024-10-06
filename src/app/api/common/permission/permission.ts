import { ActionEnum } from '../action';

export interface Permission {
  userId: string;
  actions: ActionEnum[];
  resourceId: string;
  resourceType: string;
}
