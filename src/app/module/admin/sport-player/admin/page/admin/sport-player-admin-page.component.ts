import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportPlayerStoreService } from '@app/api/domain/sport-player';
import { SportPlayerAdminPermissionsService } from '@app/api/admin/sport-player';
import { RoleNamesEnum } from '@app/api/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sport-player-admin-page',
  templateUrl: './sport-player-admin-page.component.html',
  styleUrls: ['./sport-player-admin-page.component.scss'],
})
export class SportPlayerAdminPageComponent implements OnInit {
  public buttonPermissions: string[] = [];
  public isNewEntityButtonEnabled$$$ = toSignal(
    inject(SportPlayerStoreService).selectNewEntityButtonEnabled$(),
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
      SportPlayerAdminPermissionsService.createSportPlayerEntity,
    ];
  }
}
