import { MenuItem } from 'primeng/api';
import { combineLatest, map, Observable } from 'rxjs';

import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { RoleNames, User } from '@app/api/common';
import { ApplicationStoreService } from '@app/api/core/application';
import { AuthorizationService } from '@app/api/core/authorization';
import { AdminPermissionsService } from '@app/api/module/admin';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sr-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    @Output()
  public logout: EventEmitter<boolean>;
  @Input()
  public user: User | null = null;
    public userMenuItems$!: Observable<MenuItem[]>;

    public constructor(
    private authorizationService: AuthorizationService,
    private applicationStoreService: ApplicationStoreService
  ) {
    this.logout = new EventEmitter();
  }

    public ngOnInit(): void {
    this.userMenuItems$ = combineLatest([
      this.applicationStoreService.selectAuthenticatedUser$(),
    ]).pipe(
      map(([authenticatedUser]) => { this.user = authenticatedUser;
        const userMenuItems: MenuItem[] = [
          {
            label: 'Log out',
            icon: 'pi pi-sign-out',
            command: () => {
              this.logout.emit(true);
            },
          },
        ];

        const adminItem = {
          icon: 'pi pi-cog',
          label: 'Admin',
          routerLink: 'admin',
        };

        const userItem = {
          icon: 'pi pi-cog',
          label: 'User',
          routerLink: 'user',
        }

        if (
          this.authorizationService.hasPermission('ADMIN') ||
          this.authorizationService.hasPermission(
            AdminPermissionsService.viewAdminPage
          )
        ) {
          userMenuItems.unshift(adminItem);
        }

        if (
          this.authorizationService.hasPermission(RoleNames.USER) ||
          this.authorizationService.hasPermission(
            AdminPermissionsService.viewAdminPage
          )
        ) {
          userMenuItems.unshift(userItem);
        }

        return userMenuItems;
      })
    );
  }
}
