import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit, signal, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NetworkPlayerStoreService } from '@app/api/domain/network-player';
import { NetworkPlayerAdminPermissionsService } from '@app/api/admin/network-player';
import { RoleNamesEnum } from '@app/api/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-network-player-admin-page',
  templateUrl: './network-player-admin-page.component.html',
  styleUrls: ['./network-player-admin-page.component.scss'],
})
export class NetworkPlayerAdminPageComponent implements OnInit {
  public buttonPermissions: string[] = [];
  public isNewEntityButtonEnabled$$$: Signal<boolean | undefined> = signal(false);

  public constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private networkPlayerStoreService: NetworkPlayerStoreService
  ) {}

  public clickHandler(): void {
    this.router.navigate(['edit', 0], { relativeTo: this.activatedRoute });
  }

  public ngOnInit(): void {
    this.initButtonPermissions();
    this.isNewEntityButtonEnabled$$$ =
      toSignal(this.networkPlayerStoreService.selectNewEntityButtonEnabled$());
  }

  private initButtonPermissions(): void {
    this.buttonPermissions = [
      RoleNamesEnum.ADMIN,
      NetworkPlayerAdminPermissionsService.createNetworkPlayerEntity,
    ];
  }
}
