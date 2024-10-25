import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionStoreService } from '@app/api/domain/permission';
import { PermissionAdminPermissionsService } from '@app/api/admin/permission';
import { RoleNamesEnum } from '@app/api/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-permission-admin-page',
  templateUrl: './permission-admin-page.component.html',
  styleUrls: ['./permission-admin-page.component.scss'],
})
export class PermissionAdminPageComponent implements OnInit {
  public buttonPermissions: string[] = [];
  public isNewEntityButtonEnabled$$$ = toSignal(
    inject(PermissionStoreService).selectNewEntityButtonEnabled$(),
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
      PermissionAdminPermissionsService.createPermissionEntity,
    ];
  }
}
