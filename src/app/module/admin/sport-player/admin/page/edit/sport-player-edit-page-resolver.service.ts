import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SportPlayerStoreService } from '@app/api/domain/sport-player';


@Injectable()
export class SportPlayerEditPageResolverService implements Resolve<void> {
	public constructor(private sportPlayerStoreService: SportPlayerStoreService) {}

	public resolve(): void | Observable<void> | Promise<void> {
		this.sportPlayerStoreService.dispatchChangeNewEntityButtonEnabled(false);
	}
}
