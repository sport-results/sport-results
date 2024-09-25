import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { NetworkPlayerStoreService } from '@app/api/domain/network-player';


@Injectable()
export class NetworkPlayerEditPageResolverService implements Resolve<void> {
	public constructor(private networkPlayerStoreService: NetworkPlayerStoreService) {}

	public resolve(): void | Observable<void> | Promise<void> {
		this.networkPlayerStoreService.dispatchChangeNewEntityButtonEnabled(false);
	}
}
