import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleAdminPermissionsService } from '@app/api/admin/role';
import { SportCategoryAdminPermissionsService } from '@app/api/admin/sport-category';
import { SportNetworkAdminPermissionsService } from '@app/api/admin/sport-network';
import { SportPlayerAdminPermissionsService } from '@app/api/admin/sport-player';
import { UserAdminPermissionsService } from '@app/api/admin/user';
import { RoleNames } from '@app/api/common';
import { AuthorizationService } from '@app/api/core/authorization';
import { ComponentStore } from '@ngrx/component-store';
import { MenuItem } from 'primeng/api';
import { Observable, of } from 'rxjs';

export type AdminPageViewModel = {
  menuItems: MenuItem[];
};

export interface AdminPageState {}

@Injectable()
export class AdminPageService extends ComponentStore<AdminPageState> {
  private authorizationService = inject(AuthorizationService);

  public readonly adminPageViewModel$: Observable<AdminPageViewModel> = of({
    menuItems: this.createMenuItems(),
  });

  public constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super({
      event: undefined,
    });
  }

  public init$(): void {}

  private createMenuItems(): MenuItem[] {
    const items: MenuItem[] = [];

    if (
      this.authorizationService.hasPermission(RoleNames.ADMIN) ||
      this.authorizationService.hasPermission(
        SportCategoryAdminPermissionsService.viewSportCategoryAdminPage
      )
    ) {
      items.push({
        label: 'Sport Category',
        routerLink: 'sport-category',
        tabindex: '1',
      });
    }

    if (
      this.authorizationService.hasPermission(RoleNames.ADMIN) ||
      this.authorizationService.hasPermission(
        SportPlayerAdminPermissionsService.viewSportPlayerAdminPage
      )
    ) {
      items.push({
        label: 'Sport Player',
        routerLink: 'sport-player',
      });
    }

    if (
      this.authorizationService.hasPermission(RoleNames.ADMIN) ||
      this.authorizationService.hasPermission(
        SportNetworkAdminPermissionsService.viewSportNetworkAdminPage
      )
    ) {
      items.push({
        label: 'Sport Network',
        routerLink: 'sport-network',
      });
    }

    if (
      this.authorizationService.hasPermission(RoleNames.ADMIN) ||
      this.authorizationService.hasPermission(
        RoleAdminPermissionsService.viewRoleAdminPage
      )
    ) {
      items.push({
        label: 'Role',
        routerLink: 'role',
        tabindex: '1',
      });
    }

    if (
      this.authorizationService.hasPermission(RoleNames.ADMIN) ||
      this.authorizationService.hasPermission(
        UserAdminPermissionsService.viewUserAdminPage
      )
    ) {
      items.push({
        label: 'User',
        routerLink: 'user',
        tabindex: '1',
      });
    }

    return items;
  }
}
