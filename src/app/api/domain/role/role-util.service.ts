import { EntityUtilService } from '../../core/entity';
import {
    RoleEntity,
    RoleEntityAdd,
    RoleEntityUpdate,
    RoleModel,
    RoleModelAdd,
    RoleModelUpdate,
} from './role';

export abstract class RoleUtilService extends EntityUtilService<
    RoleEntity,
    RoleEntityAdd,
    RoleEntityUpdate,
    RoleModel,
    RoleModelAdd,
    RoleModelUpdate
> {}
