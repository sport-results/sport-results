import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NETWORK_PLAYER_FEATURE_KEY,
  NetworkPlayerEntity,
  NetworkPlayerStoreService,
} from '@app/api/domain/network-player';
import { SportCategoryStoreService } from '@app/api/domain/sport-category';
import { SPORT_EVENT_FEATURE_KEY } from '@app/api/domain/sport-event';
import {
  SPORT_NETWORK_FEATURE_KEY,
  SportNetworkEntity,
  SportNetworkStoreService,
  SportNetworkUtilService,
} from '@app/api/domain/sport-network';
import { USER_FEATURE_KEY, UserEntity } from '@app/api/domain/user';
import { ComponentStore } from '@ngrx/component-store';
import {
  filter,
  map,
  Observable,
  Subject,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';

export type UserDashboardState = {
  user: UserEntity | undefined;
  sportNetworks: SportNetworkEntity[];
  selectedNetworkId: string | undefined;
  networkPlayers: NetworkPlayerEntity[] | undefined;
};
export type UserDashboardViewModel = {
  sportNetworks: SportNetworkEntity[];
  addNetworkPlayer$$: Subject<void>;
  addSportEvent$$: Subject<void>;
  networkPlayers: NetworkPlayerEntity[];
};

@Injectable()
export class UserDashboardService extends ComponentStore<UserDashboardState> {
  private networkPlayerStoreService = inject(NetworkPlayerStoreService);
  private sportCategoryStoreService = inject(SportCategoryStoreService);
  private sportNetworkStoreService = inject(SportNetworkStoreService);
  private sportNetworkUtilService = inject(SportNetworkUtilService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  private readonly networks$ = this.select((state) => state.sportNetworks);
  private readonly networkPlayers$ = this.select(
    (state) => state.networkPlayers
  ).pipe(map((networkPlayers) => networkPlayers || []));
  private readonly selectedNetworkId$ = this.select(
    (state) => state.selectedNetworkId
  );
  private readonly user$ = this.select((state) => state.user);

  private readonly fetchSportNetworks = this.effect(
    (user$: Observable<UserEntity | undefined>) =>
      user$.pipe(
        filter((user) => !!user),
        withLatestFrom(this.sportCategoryStoreService.selectEntities$()),
        switchMap(([user, sportCategories]) =>
          this.sportNetworkStoreService
            .selectSportNetworksByUserId$(user.uid)
            .pipe(
              tap((sportNetworks) => {
                this.updateSportNetworksState(sportNetworks);
                this.updateSelectedSportNetworkState(
                  sportNetworks && sportNetworks.length > 0
                    ? sportNetworks[0].uid
                    : undefined
                );
              })
            )
        )
      )
  );

  public readonly userDashboardViewModel$$$: Signal<
    UserDashboardViewModel | undefined
  > = toSignal(
    this.select({
      sportNetworks: this.networks$,
      networkPlayers: this.networkPlayers$,
    }).pipe(
      map((userDashboardViewModel) => ({
        ...userDashboardViewModel,
        addNetworkPlayer$$: this.addNetworkPlayer$$,
        addSportEvent$$: this.addSportEvent$$,
      }))
    )
  );

  private addNetworkPlayer$$: Subject<void>;
  private addSportEvent$$: Subject<void>;

  public constructor() {
    super({
      sportNetworks: [],
      user: undefined,
      selectedNetworkId: undefined,
      networkPlayers: [],
    });

    this.addNetworkPlayer$$ = new Subject<void>();
    this.addSportEvent$$ = new Subject<void>();
  }

  public init$(user: UserEntity | undefined): void {
    if (user) {
      this.sportNetworkStoreService.dispatchListEntitiesAction(
        `${USER_FEATURE_KEY}/${user?.uid}`
      );
      this.networkPlayerStoreService.dispatchListEntitiesAction;
    }

    this.updateUserState(user);
    this.fetchNetworkPlayers(this.selectedNetworkId$);
    this.fetchSportNetworks(this.user$);
    this.handleAddNetworkPlayer(this.addNetworkPlayer$$.asObservable());
    this.handleAddSportEvent(this.addSportEvent$$.asObservable());
    this.dispatchListNetworkPlayers(this.selectedNetworkId$);
  }

  private dispatchListNetworkPlayers = this.effect(
    (selectedNetworkId$: Observable<string | undefined>) =>
      selectedNetworkId$.pipe(
        withLatestFrom(this.user$),
        tap(([selectedNetworkId, user]) => {
          if (user) {
            this.networkPlayerStoreService.dispatchListEntitiesAction(
              `${USER_FEATURE_KEY}/${user.uid}/${SPORT_NETWORK_FEATURE_KEY}/${selectedNetworkId}`
            );
          }
        })
      )
  );

  private readonly fetchNetworkPlayers = this.effect(
    (selectedNetworkId$: Observable<string | undefined>) =>
      selectedNetworkId$.pipe(
        switchMap((selectedNetworkId) =>
          this.networkPlayerStoreService
            .selectEntitiesBySportNetworkId$(selectedNetworkId || '')
            .pipe(
              tap((networkPlayers) => {
                this.updateNetworkPlayersState(networkPlayers);
              })
            )
        )
      )
  );

  private readonly handleAddNetworkPlayer = this.effect(
    (addNetworkPlayer$: Observable<void>) => {
      return addNetworkPlayer$.pipe(
        switchMap(() =>
          this.selectedNetworkId$.pipe(
            tap((selectedNetworkId) =>
              this.router.navigate(
                [`../${selectedNetworkId}/${NETWORK_PLAYER_FEATURE_KEY}/edit`, 0],
                {
                  relativeTo: this.activatedRoute,
                }
              )
            )
          )
        )
      );
    }
  );

  private readonly handleAddSportEvent = this.effect(
    (addSportEvent$: Observable<void>) => {
      return addSportEvent$.pipe(
        switchMap(() =>
          this.selectedNetworkId$.pipe(
            tap((selectedNetworkId) =>
              this.router.navigate(
                [`../${selectedNetworkId}/${SPORT_EVENT_FEATURE_KEY}/edit`, 0],
                {
                  relativeTo: this.activatedRoute,
                }
              )
            )
          )
        )
      );
    }
  );

  private updateSportNetworksState(sportNetworks: SportNetworkEntity[]): void {
    this.setState((state) => {
      return {
        ...state,
        sportNetworks,
      };
    });
  }

  private updateSelectedSportNetworkState(
    selectedNetworkId: string | undefined
  ): void {
    this.setState((state) => {
      return {
        ...state,
        selectedNetworkId,
      };
    });
  }

  private updateNetworkPlayersState(
    networkPlayers: NetworkPlayerEntity[]
  ): void {
    this.setState((state) => {
      return {
        ...state,
        networkPlayers,
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
