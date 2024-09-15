import { MenuItem } from 'primeng/api';
import { Observable, of } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ComponentStore } from '@ngrx/component-store';
import { AuthorizationService } from '@app/api/core/authorization';
import { RoleNames } from '@app/api/common';
import { SportCategoryAdminPermissionsService } from '@app/api/admin/sport-category';
import { AdminPermissionsService } from '@app/api/module/admin';
import { RoleAdminPermissionsService } from '@app/api/admin/role';
import { UserAdminPermissionsService } from '@app/api/admin/user';

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
