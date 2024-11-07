import { Observable } from 'rxjs';

import { EntityStoreService } from '../../core/entity';
import { RoleEntity, RoleEntityAdd, RoleEntityUpdate } from './role';

export abstract class RoleStoreService extends EntityStoreService<
  RoleEntity,
  RoleEntityAdd,
  RoleEntityUpdate
> {
  public abstract dispatchChangeNewEntityButtonEnabled(enabled: boolean): void;
  public abstract selectNewEntityButtonEnabled$(): Observable<boolean>;
  public abstract selectEntitiesByIds$(
    ids: string[]
  ): Observable<RoleEntity[]>;
}
