import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SportResultStoreService } from '@app/api/domain/sport-result';


@Injectable()
export class SportResultEditPageResolverService implements Resolve<void> {
	public constructor(private sportResultStoreService: SportResultStoreService) {}

	public resolve(): void | Observable<void> | Promise<void> {
		this.sportResultStoreService.dispatchChangeNewEntityButtonEnabled(false);
	}
}
