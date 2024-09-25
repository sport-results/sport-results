import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { UserDashboardComponent } from '../../../dashboard/user-dashboard.component';
import { ApplicationStoreService } from '@app/api/core/application';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '@app/api/common';
import { map } from 'rxjs';
import { UserEntity } from '@app/api/domain/user';
import { RouterModule } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [UserDashboardComponent, ],
  selector: 'sr-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  private applicationStoreService = inject(ApplicationStoreService);

  public user$$$?: Signal<UserEntity | undefined>;

  constructor() {
    this.user$$$ = toSignal(
      this.applicationStoreService
        .selectAuthenticatedUser$()
        .pipe(map((user) => user as UserEntity))
    );
  }
}
