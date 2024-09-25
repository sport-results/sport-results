import { Component, inject, Input, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserEntity } from '@app/api/domain/user';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';

import {
  UserDashboardService,
  UserDashboardViewModel,
} from './user-dashboard.service';

@Component({
  selector: 'sr-user-dashboard',
  standalone: true,
  imports: [ButtonModule, CardModule, TabViewModule, PanelModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
  providers: [UserDashboardService],
})
export class UserDashboardComponent {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private userDashboardService = inject(UserDashboardService);

  @Input() public user?: UserEntity;
  public userDashboardViewModel$$$!: Signal<UserDashboardViewModel | undefined>;

  public clickHandler(): void {
    this.router.navigate(['../network-player/edit', 0], { relativeTo: this.activatedRoute });
  }

  public ngOnInit(): void {
    this.userDashboardService.init$(this.user);
    this.userDashboardViewModel$$$ =
      this.userDashboardService.userDashboardViewModel$$$;
  }
}
