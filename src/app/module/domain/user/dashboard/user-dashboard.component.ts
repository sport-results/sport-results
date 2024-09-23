import { Component, inject, Input, Signal, OnInit } from '@angular/core';
import { UserEntity } from '@app/api/domain/user';
import { CardModule } from 'primeng/card';

import {
  UserDashboardService,
  UserDashboardViewModel,
} from './user-dashboard.service';

@Component({
  selector: 'sr-user-dashboard',
  standalone: true,
  imports: [CardModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
  providers: [UserDashboardService],
})
export class UserDashboardComponent {
  private userDashboardService = inject(UserDashboardService);

  @Input() user?: UserEntity;
  public userDashboardViewModel$$$!: Signal<UserDashboardViewModel | undefined>;

  ngOnInit(): void {
    this.userDashboardService.init$(this.user);
    this.userDashboardViewModel$$$ =
      this.userDashboardService.userDashboardViewModel$$$;
  }
}
