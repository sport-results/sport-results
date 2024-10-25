import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportEventStoreService } from '@app/api/domain/sport-event';
import { SportEventAdminPermissionsService } from '@app/api/admin/sport-event';
import { RoleNamesEnum } from '@app/api/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sport-event-admin-page',
  templateUrl: './sport-event-admin-page.component.html',
  styleUrls: ['./sport-event-admin-page.component.scss'],
})
export class SportEventAdminPageComponent implements OnInit {
  public buttonPermissions: string[] = [];
  public isNewEntityButtonEnabled$$$ = toSignal(
    inject(SportEventStoreService).selectNewEntityButtonEnabled$(),
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
      SportEventAdminPermissionsService.createSportEventEntity,
    ];
  }
}
