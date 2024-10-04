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
}
