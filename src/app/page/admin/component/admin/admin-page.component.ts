import { Observable } from 'rxjs';

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { AdminPageService, AdminPageViewModel } from './admin-page.service';
import {
  AdminSportCategoryPermissionsService,
  AdminSportCategoryRulePermissionsService,
  AdminSportNetworkPermissionsService,
  AdminSportPlayerPermissionsService, AdminNetworkPlayerPermissionsService, AdminSportEventPermissionsService, AdminPermissionPermissionsService,
} from '../../permissions';
import { AuthorizationService } from '@app/api/core/authorization';
import { AdminRolePermissionsService } from '../../permissions/admin-role-permissions.service';
import { AdminUserPermissionsService } from '../../permissions/admin-user-permissions.service';
import { AdminPermissionsService } from '@app/api/module/admin';
import { SportCategoryRuleAdminPermissionsService } from '@app/api/admin/sport-category-rule';
import { SportNetworkAdminPermissionsService } from '@app/api/admin/sport-network';
import { SportPlayerAdminPermissionsService } from '@app/api/admin/sport-player';
import { NetworkPlayerAdminPermissionsService } from '@app/api/admin/network-player';
import { SportEventAdminPermissionsService } from '@app/api/admin/sport-event';
import { PermissionAdminPermissionsService } from '@app/api/admin/permission';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AdminPageService],
  selector: 'sr-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  private componentService = inject(AdminPageService);

  public adminPageViewModel$!: Observable<AdminPageViewModel>;

  public ngOnInit(): void {
    this.componentService.init$();
    this.adminPageViewModel$ = this.componentService.adminPageViewModel$;
  }
}
