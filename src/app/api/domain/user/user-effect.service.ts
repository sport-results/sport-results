import { Observable } from 'rxjs';

import { User } from '../../common/user';
import { EntityEffectService } from '../../core';
import { UserEntity, UserEntityAdd, UserEntityUpdate } from './user';

export abstract class UserEffectService extends EntityEffectService<
    UserEntity,
    UserEntityAdd,
    UserEntityUpdate
> {
    public abstract loadExistedUser$(user: User): Observable<UserEntity>;
}
