import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { AdminPageService, AdminPageViewModel } from './admin-page.service';
import { SportCategoryAdminPermissionsService } from '@app/api/admin/sport-category';
import { AdminSportCategoryPermissionsService } from '../../permissions';
import { RoleNames } from '@app/api/common';
import { AuthorizationService } from '@app/api/core/authorization';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AdminPageService],
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  private componentService = inject(AdminPageService);
  private authorizationService = inject(AuthorizationService);

  public adminPageViewModel$!: Observable<AdminPageViewModel>;
 

  public ngOnInit(): void {
    this.componentService.init$();
    this.adminPageViewModel$ = this.componentService.adminPageViewModel$;
  }
}
