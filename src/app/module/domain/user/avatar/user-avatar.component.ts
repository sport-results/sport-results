import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { combineLatest, map } from 'rxjs';

import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RoleNames, User } from '@app/api/common';
import { ApplicationStoreService } from '@app/api/core/application';
import { AuthorizationService } from '@app/api/core/authorization';
import { AdminPermissionsService } from '@app/api/module/admin';

@Component({
  selector: 'sr-user-avatar',
  standalone: true,
  imports: [AvatarModule, MenuModule],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
})
export class UserAvatarComponent {
  private applicationStoreService = inject(ApplicationStoreService);
  private authorizationService = inject(AuthorizationService);

  @Output()
  public logout = new EventEmitter<boolean>();
  @Input()
  public user: User | null = null;
  public userMenuItems$$$!: Signal<MenuItem[] | undefined>;

  constructor() {
    this.userMenuItems$$$ = toSignal(
      combineLatest([
        this.applicationStoreService.selectAuthenticatedUser$(),
      ]).pipe(
        map(([authenticatedUser]) => {
          return this.createMenuItems(authenticatedUser);
        })
      )
    );
  }

  private createMenuItems(user: User | null): MenuItem[] {
    this.user = user;
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
    };

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
  }
}
