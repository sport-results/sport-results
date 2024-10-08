import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportPlayerStoreService } from '@app/api/domain/sport-player';
import { SportPlayerAdminPermissionsService } from '@app/api/admin/sport-player';
import { RoleNamesEnum } from '@app/api/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sport-player-admin-page',
  templateUrl: './sport-player-admin-page.component.html',
  styleUrls: ['./sport-player-admin-page.component.scss'],
})
export class SportPlayerAdminPageComponent implements OnInit {
  public buttonPermissions: string[] = [];
  public isNewEntityButtonEnabled$!: Observable<boolean>;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sportPlayerStoreService: SportPlayerStoreService
  ) {}

  public clickHandler(): void {
    this.router.navigate(['edit', 0], { relativeTo: this.activatedRoute });
  }

  public ngOnInit(): void {
    this.initButtonPermissions();
    this.isNewEntityButtonEnabled$ =
      this.sportPlayerStoreService.selectNewEntityButtonEnabled$();
  }

  private initButtonPermissions(): void {
    this.buttonPermissions = [
      RoleNamesEnum.ADMIN,
      SportPlayerAdminPermissionsService.createSportPlayerEntity,
    ];
  }
}
