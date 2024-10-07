import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionEnum, RoleNamesEnum } from '@app/api/common';
import { AuthorizationService } from '@app/api/core/authorization';
import { NETWORK_PLAYER_FEATURE_KEY } from '@app/api/domain/network-player';
import {
  SPORT_EVENT_FEATURE_KEY,
  SportEventEntity,
  SportEventStoreService,
} from '@app/api/domain/sport-event';
import { SPORT_NETWORK_FEATURE_KEY } from '@app/api/domain/sport-network';
import { USER_FEATURE_KEY } from '@app/api/domain/user';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    DatePipe,
    NgxPermissionsModule,
  ],
  providers: [ConfirmationService],
  selector: 'sr-sport-event-card',
  standalone: true,
  styleUrl: './sport-event-card.component.scss',
  templateUrl: './sport-event-card.component.html',
})
export class SportEventCardComponent implements OnInit {
  private authorizationService = inject(AuthorizationService);
  private confirmationService = inject(ConfirmationService);
  private entityStoreService = inject(SportEventStoreService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

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

  public handleDeleteClick(sportEvent: SportEventEntity): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        const subCollectionPath = `${sportEvent.path[0].key}/${sportEvent.path[0].value}/${sportEvent.path[1].key}/${sportEvent.path[1].value}`;

        this.entityStoreService.dispatchDeleteEntityAction(
          sportEvent,
          subCollectionPath
        );
      },
    });
  }

  public handleUpdateClick(sportEvent: SportEventEntity): void {
    this.router.navigate(
      [
        `../${sportEvent.path[1].value}/${SPORT_EVENT_FEATURE_KEY}/edit`,
        sportEvent.uid,
      ],
      {
        relativeTo: this.activatedRoute,
      }
    );
  }
}
