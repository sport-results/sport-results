import { Observable } from 'rxjs';

import { EntityStoreService } from '../../core';
import { UserEntity, UserEntityAdd, UserEntityUpdate } from './user';

export abstract class UserStoreService extends EntityStoreService<
    UserEntity,
    UserEntityAdd,
    UserEntityUpdate
> {
    public abstract dispatchChangeNewEntityButtonEnabled(
        enabled: boolean
    ): void;
    public abstract selectNewEntityButtonEnabled$(): Observable<boolean>;
    public abstract dispatchLoadExistedUserAction(user: UserEntity): void;
}
