import { MenuItem } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ComponentStore } from '@ngrx/component-store';
import { AuthorizationService } from '@app/api/core/authorization';
import { RoleNames } from '@app/api/common';
import { SportCategoryAdminPermissionsService } from '@app/api/admin/sport-category';

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

    return items;
  }
}
