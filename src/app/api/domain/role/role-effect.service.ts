import { EntityEffectService } from '../../core';
import { RoleEntity, RoleEntityAdd, RoleEntityUpdate } from './role';

export abstract class RoleEffectService extends EntityEffectService<
    RoleEntity,
    RoleEntityAdd,
    RoleEntityUpdate
> {}
