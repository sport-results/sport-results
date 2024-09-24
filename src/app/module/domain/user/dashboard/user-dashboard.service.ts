import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SportCategoryStoreService } from '@app/api/domain/sport-category';
import {
  SportNetworkEntity,
  SportNetworkStoreService,
  SportNetworkUtilService,
} from '@app/api/domain/sport-network';
import { USER_FEATURE_KEY, UserEntity } from '@app/api/domain/user';
import { ComponentStore } from '@ngrx/component-store';
import { filter, map, Observable, switchMap, tap, withLatestFrom } from 'rxjs';

export type UserDashboardState = {
  user: UserEntity | undefined;
  sportNetworks: SportNetworkEntity[];
};
export type UserDashboardViewModel = {
  sportNetworks: SportNetworkEntity[];
};

@Injectable()
export class UserDashboardService extends ComponentStore<UserDashboardState> {
  private sportCategoryStoreService = inject(SportCategoryStoreService);
  private sportNetworkStoreService = inject(SportNetworkStoreService);
  private sportNetworkUtilService = inject(SportNetworkUtilService);

  private readonly networks$ = this.select((state) => state.sportNetworks);
  private readonly user$ = this.select((state) => state.user);

  private readonly selectSportNetworks = this.effect(
    (user$: Observable<UserEntity | undefined>) => {
      return user$.pipe(
        filter((user) => !!user),
        withLatestFrom(this.sportCategoryStoreService.selectEntities$()),
        switchMap(([user, sportCategories]) =>
          this.sportNetworkStoreService
            .selectSportNetworksByUserId$(user.uid)
            .pipe(
              tap((sportNetworks) => {
                this.updateSportNetworksState(sportNetworks);
              })
            )
        )
      );
    }
  );

  public readonly userDashboardViewModel$$$: Signal<
    UserDashboardViewModel | undefined
  > = toSignal(
    this.select({
      sportNetworks: this.networks$,
    }).pipe(
      map((userDashboardViewModel) => ({
        ...userDashboardViewModel,
      }))
    )
  );

  public constructor() {
    super({
      sportNetworks: [],
      user: undefined,
    });
  }

  public init$(user: UserEntity | undefined): void {
    if (user) {
      this.sportNetworkStoreService.dispatchListEntitiesAction(
        `${USER_FEATURE_KEY}/${user?.uid}`
      );
    }

    this.updateUserState(user);
    this.selectSportNetworks(this.user$);
  }

  private updateSportNetworksState(sportNetworks: SportNetworkEntity[]): void {
    this.setState((state) => {
      return {
        ...state,
        sportNetworks,
      };
    });
  }

  private updateUserState(user: UserEntity | undefined): void {
    this.setState((state) => {
      return {
        ...state,
        user,
      };
    });
  }
}
