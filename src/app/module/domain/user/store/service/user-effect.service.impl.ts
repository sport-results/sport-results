import { first, map, Observable, of, switchMap, tap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { User } from '@app/api/common';
import {
  USER_FEATURE_KEY,
  UserDataService,
  UserEntity,
  UserModelUpdate,
  UserUtilService,
} from '@app/api/domain/user';
import { EntityEffectServiceImpl } from '@app/core/entity';
import {
  SportNetworkStoreService,
  SportNetworkUtilService,
} from '@app/api/domain/sport-network';

@Injectable()
export class UserEffectServiceImpl extends EntityEffectServiceImpl {
  private sportNetworkStoreService = inject(SportNetworkStoreService);
  private sportNetworkUtilService = inject(SportNetworkUtilService);

  public constructor(
    userDataService: UserDataService,
    userUtilService: UserUtilService
  ) {
    super(userDataService, userUtilService);
  }

  public loadExistedUser$(user: User): Observable<UserEntity> {
    return this.entityDataService.load$(user.uid || '').pipe(
      switchMap((model) => {
        if (!model || !model.uid) {
          this.sportNetworkStoreService.dispatchAddEntityAction(
            this.sportNetworkUtilService.createDefaultSportNetwork(
              [],
              user as UserEntity
            ),
            `${USER_FEATURE_KEY}/${user.uid}`
          );

          return this.entityDataService
            .update$(
              this.entityUtilService.convertEntityUpdateToModelUpdate(
                user as unknown as UserModelUpdate
              )
            );
        } else {
          return of(model);
        }
      }),
      switchMap((model) =>
        this.entityUtilService.convertModelUpdateToEntityUpdate$(model)
      ),
      map((entity) => entity as UserEntity)
    );
  }
}
