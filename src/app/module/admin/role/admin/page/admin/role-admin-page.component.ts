import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleAdminPermissionsService } from '@app/api/admin/role';
import { RoleNamesEnum } from '@app/api/common';
import { RoleStoreService } from '@app/api/domain/role';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sr-role-admin-page',
  templateUrl: './role-admin-page.component.html',
  styleUrls: ['./role-admin-page.component.scss'],
})
export class RoleAdminPageComponent implements OnInit {
  public buttonPermissions: string[] = [];
  public isNewEntityButtonEnabled$$$ = toSignal(
    inject(RoleStoreService).selectNewEntityButtonEnabled$(),
    { initialValue: false }
  );

  public constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public clickHandler(): void {
    this.router.navigate(['edit', 0], { relativeTo: this.activatedRoute });
  }

  public ngOnInit(): void {
    this.initButtonPermissions();
  }

  private initButtonPermissions(): void {
    this.buttonPermissions = [
      RoleNamesEnum.ADMIN,
      RoleAdminPermissionsService.createRoleEntity,
    ];
  }
}
