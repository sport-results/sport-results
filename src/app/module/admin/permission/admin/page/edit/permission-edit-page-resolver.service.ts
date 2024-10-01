import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PermissionStoreService } from '@app/api/domain/permission';


@Injectable()
export class PermissionEditPageResolverService implements Resolve<void> {
	public constructor(private permissionStoreService: PermissionStoreService) {}

	public resolve(): void | Observable<void> | Promise<void> {
		this.permissionStoreService.dispatchChangeNewEntityButtonEnabled(false);
	}
}
