import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SportNetworkStoreService } from '@app/api/domain/sport-network';


@Injectable()
export class SportNetworkEditPageResolverService implements Resolve<void> {
	public constructor(private sportNetworkStoreService: SportNetworkStoreService) {}

	public resolve(): void | Observable<void> | Promise<void> {
		this.sportNetworkStoreService.dispatchChangeNewEntityButtonEnabled(false);
	}
}
