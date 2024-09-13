import { EntityDataService } from '../../core/entity';
import { RoleModel, RoleModelAdd, RoleModelUpdate } from './role';

export abstract class RoleDataService extends EntityDataService<
    RoleModel,
    RoleModelAdd,
    RoleModelUpdate
> {}
