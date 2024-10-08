import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportNetworkStoreService } from '@app/api/domain/sport-network';
import { SportNetworkAdminPermissionsService } from '@app/api/admin/sport-network';
import { RoleNamesEnum } from '@app/api/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sport-network-admin-page',
  templateUrl: './sport-network-admin-page.component.html',
  styleUrls: ['./sport-network-admin-page.component.scss'],
})
export class SportNetworkAdminPageComponent implements OnInit {
  public buttonPermissions: string[] = [];
  public isNewEntityButtonEnabled$!: Observable<boolean>;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sportNetworkStoreService: SportNetworkStoreService
  ) {}

  public clickHandler(): void {
    this.router.navigate(['edit', 0], { relativeTo: this.activatedRoute });
  }

  public ngOnInit(): void {
    this.initButtonPermissions();
    this.isNewEntityButtonEnabled$ =
      this.sportNetworkStoreService.selectNewEntityButtonEnabled$();
  }

  private initButtonPermissions(): void {
    this.buttonPermissions = [
      RoleNamesEnum.ADMIN,
      SportNetworkAdminPermissionsService.createSportNetworkEntity,
    ];
  }
}
