import { map, Observable, of, switchMap, tap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { ActionEnum, User } from '@app/api/common';
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
import { AuthorizationService } from '@app/api/core/authorization';
import { RoleEntity } from '@app/api/domain/role';
import { ApplicationStoreService } from '@app/api/core/application';

@Injectable()
export class UserEffectServiceImpl extends EntityEffectServiceImpl {
  private applicationStoreService = inject(ApplicationStoreService);
  private authorizationService = inject(AuthorizationService);
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
      tap(console.log),
      switchMap((model) => {
        if (!model || !model.uid) {
          this.sportNetworkStoreService.dispatchAddEntityAction(
            this.sportNetworkUtilService.createDefaultSportNetwork(
              [],
              user as UserEntity,
              this.sportNetworkUtilService.createPath(user.uid)
            ),
            `${USER_FEATURE_KEY}/${user.uid}`
          );

          return this.entityDataService
            .update$(
              this.entityUtilService.convertEntityUpdateToModelUpdate(
                user as unknown as UserModelUpdate
              )
            )
            .pipe(map((user) => user as UserEntity));
        } else {
          return of(model);
        }
      }),
      switchMap((model) =>
        this.entityUtilService.convertModelUpdateToEntityUpdate$(model)
      ),
      tap((user) => {
        this.authorizationService.removeAll();
        this.authorizationService.addRoles(
          (user as unknown as UserEntity).roles as RoleEntity[]
        );
        this.authorizationService.addPermission(
          `${ActionEnum.SOME}${user.uid}`
        );
        this.applicationStoreService.dispatchAuthenticated(
          user as unknown as UserEntity
        );
      }),
      map((entity) => entity as UserEntity)
    );
  }
}
