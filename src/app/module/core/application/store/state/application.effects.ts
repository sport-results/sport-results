import { map } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { RoleNames } from '@app/api/common';
import { ApplicationStoreService } from '@app/api/core/application';
import { AuthorizationService } from '@app/api/core/authorization';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as applicationActions from './application.actions';

@Injectable()
export class ApplicationEffects {
  private actions$ = inject(Actions);
  private applicationStoreService = inject(ApplicationStoreService);
  private authorizationService$ = inject(AuthorizationService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(applicationActions.login),
      map((action) => {
        this.authorizationService$.addPermission(RoleNames.ADMIN);
        this.applicationStoreService.dispatchSetCheckpointId(1);

        return applicationActions.loginSuccess({
          user: {
            id: 'admin',
            email: 'admin@example.com',
            displayName: 'Test Admin',
            roles: [{
              id: 'admin',
              name: RoleNames.ADMIN,
              editable: false,
              permissions: ['ADMIN']
            }]
          },
        });
      })
    )
  );
  testLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(applicationActions.testLogin),
      map((action) => {
        this.authorizationService$.removeAll();

        const user = action.user;

        user.roles.map((role) =>
          this.authorizationService$.addPermission(role.name)
        );

        this.applicationStoreService.dispatchSetCheckpointId(
          user.checkpointId || 0
        );

        return applicationActions.testLoginSuccess({
          user,
        });
      })
    )
  );
}
