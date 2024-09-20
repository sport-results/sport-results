import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SportCategoryRuleStoreService } from '@app/api/domain/sport-category-rule';


@Injectable()
export class SportCategoryRuleEditPageResolverService implements Resolve<void> {
	public constructor(private sportCategoryRuleStoreService: SportCategoryRuleStoreService) {}

	public resolve(): void | Observable<void> | Promise<void> {
		this.sportCategoryRuleStoreService.dispatchChangeNewEntityButtonEnabled(false);
	}
}
