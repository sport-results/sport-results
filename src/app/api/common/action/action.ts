export interface Action {
  name: string;
}

export enum ActionEnum {
  ALL = 'all',
  SOME = 'some',
  VIEW = 'view',
  UPDATE = 'update',
  CREATE = 'create',
  DELETE = 'delete',
  RESULT = 'result',
}

export const selectableActions: ActionEnum[] = [
  ActionEnum.VIEW,
  ActionEnum.CREATE,
  ActionEnum.UPDATE,
  ActionEnum.DELETE,
  ActionEnum.RESULT,
];
