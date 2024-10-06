import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { ActionEnum, RoleNamesEnum } from '@app/api/common';
import { AuthorizationService } from '@app/api/core/authorization';
import { SportEventEntity } from '@app/api/domain/sport-event';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonModule, CardModule, DatePipe, NgxPermissionsModule],
  selector: 'sr-sport-event-card',
  standalone: true,
  styleUrl: './sport-event-card.component.scss',
  templateUrl: './sport-event-card.component.html',
})
export class SportEventCardComponent implements OnInit {
  private authorizationService = inject(AuthorizationService);

  @Input()
  public sportEvent?: SportEventEntity;
  public updatePermissions: string[] = [];
  public deletePermissions: string[] = [];

  public ngOnInit(): void {
    this.initPermissions();
  }

  private initPermissions(): void {
    this.updatePermissions = [
      RoleNamesEnum.ADMIN,
      this.authorizationService.generatePermissionName(
        RoleNamesEnum.OWNER,
        this.sportEvent?.uid || ''
      ),
      this.authorizationService.generatePermissionName(
        ActionEnum.UPDATE,
        this.sportEvent?.uid || ''
      ),
    ];

    this.deletePermissions = [
      RoleNamesEnum.ADMIN,
      this.authorizationService.generatePermissionName(
        RoleNamesEnum.OWNER,
        this.sportEvent?.uid || ''
      ),
      this.authorizationService.generatePermissionName(
        ActionEnum.DELETE,
        this.sportEvent?.uid || ''
      ),
    ];
  }
}
