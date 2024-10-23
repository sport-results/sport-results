import { Injectable } from '@angular/core';
import { RoleDataService, RoleUtilService } from '@app/api/domain/role';
import { EntityEffectServiceImpl } from '@app/core/entity';

@Injectable()
export class RoleEffectServiceImpl extends EntityEffectServiceImpl {
    public constructor(
        roleDataService: RoleDataService,
        roleUtilService: RoleUtilService
    ) {
        super(roleDataService, roleUtilService);
    }
}
