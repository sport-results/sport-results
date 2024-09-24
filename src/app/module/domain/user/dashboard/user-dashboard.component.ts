import { Component, inject, Input, Signal } from '@angular/core';
import { UserEntity } from '@app/api/domain/user';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';

import {
  UserDashboardService,
  UserDashboardViewModel,
} from './user-dashboard.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'sr-user-dashboard',
  standalone: true,
  imports: [ButtonModule, CardModule, TabViewModule, PanelModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
  providers: [UserDashboardService],
})
export class UserDashboardComponent {
  private userDashboardService = inject(UserDashboardService);

  @Input() public user?: UserEntity;
  public userDashboardViewModel$$$!: Signal<UserDashboardViewModel | undefined>;

  public ngOnInit(): void {
    this.userDashboardService.init$(this.user);
    this.userDashboardViewModel$$$ =
      this.userDashboardService.userDashboardViewModel$$$;
  }
}
