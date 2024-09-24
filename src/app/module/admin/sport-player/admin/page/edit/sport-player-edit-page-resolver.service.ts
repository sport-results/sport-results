import { Observable } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SportPlayerStoreService } from '@app/api/domain/sport-player';
import { UserStoreService } from '@app/api/domain/user';


@Injectable()
export class SportPlayerEditPageResolverService implements Resolve<void> {
	private sportPlayerStoreService = inject(SportPlayerStoreService);
  private userStoreService = inject(UserStoreService);

	public resolve(): void | Observable<void> | Promise<void> {
		this.sportPlayerStoreService.dispatchChangeNewEntityButtonEnabled(false);
    this.userStoreService.dispatchListEntitiesAction();
	}
}
