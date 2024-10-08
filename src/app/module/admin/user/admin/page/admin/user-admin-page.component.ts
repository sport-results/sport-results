import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  public isNewEntityButtonEnabled$!: Observable<boolean>;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userStoreService: UserStoreService
  ) {}

  public clickHandler(): void {
    this.router.navigate(['edit', 0], { relativeTo: this.activatedRoute });
  }

  public ngOnInit(): void {
    this.initButtonPermissions();
    this.isNewEntityButtonEnabled$ =
      this.userStoreService.selectNewEntityButtonEnabled$();
  }

  private initButtonPermissions(): void {
    this.buttonPermissions = [
      RoleNamesEnum.ADMIN,
      UserAdminPermissionsService.createUserEntity,
    ];
  }
}
