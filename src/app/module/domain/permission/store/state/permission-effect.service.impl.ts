import { Injectable } from '@angular/core';
import { PermissionDataService, PermissionUtilService } from '@app/api/domain/permission';
import { EntityEffectServiceImpl } from '@app/core/entity';

@Injectable()
export class PermissionEffectServiceImpl extends EntityEffectServiceImpl {
    public constructor(
        permissionDataService: PermissionDataService,
        permissionUtilService: PermissionUtilService
    ) {
        super(permissionDataService, permissionUtilService);
    }
}
