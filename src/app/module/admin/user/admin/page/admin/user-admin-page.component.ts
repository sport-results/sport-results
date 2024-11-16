import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAdminPermissionsService } from '@app/api/admin/user';
import { UserStoreService } from '@app/api/domain/user';
import { RoleNamesEnum } from '@app/api/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sr-user-admin-page',
  templateUrl: './user-admin-page.component.html',
  styleUrls: ['./user-admin-page.component.scss'],
})
export class UserAdminPageComponent implements OnInit {
  public buttonPermissions: string[] = [];
  public isNewEntityButtonEnabled$$$ =
    inject(UserStoreService).selectNewEntityButtonEnabled();


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
      UserAdminPermissionsService.createUserEntity,
    ];
  }
}
