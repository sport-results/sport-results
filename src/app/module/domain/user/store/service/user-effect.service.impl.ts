import { map, Observable, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { User } from '@app/api/common';
import {
  UserDataService,
  UserEntity,
  UserModelUpdate,
  UserUtilService,
} from '@app/api/domain/user';
import { EntityEffectServiceImpl } from '@app/core/entity';

@Injectable()
export class UserEffectServiceImpl extends EntityEffectServiceImpl {
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
          return this.entityDataService.update$(
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
