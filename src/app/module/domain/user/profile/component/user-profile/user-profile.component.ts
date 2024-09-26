import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { UserDashboardComponent } from '../../../dashboard/user-dashboard.component';
import { ApplicationStoreService } from '@app/api/core/application';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { UserEntity } from '@app/api/domain/user';
import { ActivatedRoute } from '@angular/router';

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
  private activatedRoute = inject(ActivatedRoute);

  public user$$$?: Signal<UserEntity | undefined>;
  public sportNetworkId?: Signal<string | undefined>;

  constructor() {
    this.user$$$ = toSignal(
      this.applicationStoreService
        .selectAuthenticatedUser$()
        .pipe(map((user) => user as UserEntity))
    );

    this.sportNetworkId = signal(this.activatedRoute.snapshot.params['networkId']);
  }
}
