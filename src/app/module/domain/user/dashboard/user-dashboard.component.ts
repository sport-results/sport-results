import { SportEventCardComponent } from './../../sport-event/collection/component/card/sport-event-card.component';
import { Component, inject, Input, Signal } from '@angular/core';
import { UserEntity } from '@app/api/domain/user';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TabViewChangeEvent, TabViewModule } from 'primeng/tabview';

import {
  UserDashboardService,
  UserDashboardViewModel,
} from './user-dashboard.service';

@Component({
  selector: 'sr-user-dashboard',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    TabViewModule,
    PanelModule,
    SportEventCardComponent,
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
  providers: [UserDashboardService],
})
export class UserDashboardComponent {
  private userDashboardService = inject(UserDashboardService);

  @Input()
  public user?: UserEntity;
  public userDashboardViewModel$$$!: Signal<UserDashboardViewModel | undefined>;

  public ngOnInit(): void {
    this.userDashboardService.init$(this.user);
    this.userDashboardViewModel$$$ =
      this.userDashboardService.userDashboardViewModel$$$;
  }

  onChangeHandler(event: TabViewChangeEvent): void {
    console.log(event);
  }

  onActiveIndexChangeHandler(index: number): void {
    console.log(index);
  }
}
