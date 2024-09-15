import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SportCategoryStoreService } from '@app/api/domain/sport-category';


@Injectable()
export class SportCategoryEditPageResolverService implements Resolve<void> {
	public constructor(private sportCategoryStoreService: SportCategoryStoreService) {}

	public resolve(): void | Observable<void> | Promise<void> {
		this.sportCategoryStoreService.dispatchChangeNewEntityButtonEnabled(false);
	}
}
