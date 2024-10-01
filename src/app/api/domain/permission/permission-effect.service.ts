import { EntityEffectService } from '../../core';
import { PermissionEntity, PermissionEntityAdd, PermissionEntityUpdate } from './permission';

export abstract class PermissionEffectService extends EntityEffectService<
    PermissionEntity,
    PermissionEntityAdd,
    PermissionEntityUpdate
> {}
