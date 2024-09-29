import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SportEventStoreService } from '@app/api/domain/sport-event';


@Injectable()
export class SportEventEditPageResolverService implements Resolve<void> {
	public constructor(private sportEventStoreService: SportEventStoreService) {}

	public resolve(): void | Observable<void> | Promise<void> {
		this.sportEventStoreService.dispatchChangeNewEntityButtonEnabled(false);
	}
}
