import { Observable, Subject, tap } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  NetworkPlayerEntity,
  NetworkPlayerEntityAdd,
  NetworkPlayerStoreService,
  NetworkPlayerFormUtil,
} from '@app/api/domain/network-player';

import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import {
  SPORT_NETWORK_FEATURE_KEY,
  SportNetworkEntity,
  SportNetworkStoreService,
} from '@app/api/domain/sport-network';
import {
  USER_FEATURE_KEY,
  UserEntity,
  UserStoreService,
} from '@app/api/domain/user';
import {
  SportPlayerEntity,
  SportPlayerStoreService,
} from '@app/api/domain/sport-player';

export interface NetworkPlayerFormState {
  formGroup: FormGroup | undefined;
  entity: NetworkPlayerEntity | undefined;
  entityId: string | undefined;
  sportNetwork: SportNetworkEntity | undefined;
  sportPlayers: SportPlayerEntity[];
  user: UserEntity | undefined;
}

export type EntityFormViewModel = {
  formGroup: FormGroup;
  cancel$$: Subject<void>;
  submit$$: Subject<void>;
  sportPlayers: SportPlayerEntity[];
  sportNetworks: SportNetworkEntity[];
};

@Injectable()
export class NetworkPlayerFormService extends ComponentStore<NetworkPlayerFormState> {
  private activatedRoute = inject(ActivatedRoute);
  private networkPlayerStoreService = inject(NetworkPlayerStoreService);
  private networkPlayerFormUtil = inject(NetworkPlayerFormUtil);
  private router = inject(Router);
  private sportNetworkStoreService = inject(SportNetworkStoreService);
  private sportPlayerStoreService = inject(SportPlayerStoreService);
  private userStoreService = inject(UserStoreService);

  private readonly entity$ = this.select((state) => state.entity);
  private readonly entityId$ = this.select((state) => state.entityId);
  private readonly formGroup$ = this.select((state) => state.formGroup);
  private readonly sportNetwork$ = this.select((state) => state.sportNetwork);
  private readonly sportPlayers$ = this.select((state) => state.sportPlayers);
  private readonly user$ = this.select((state) => state.user);

  private readonly fetchEntity = this.effect(
    (entityId$: Observable<string | undefined>) => {
      return entityId$.pipe(
        switchMap((entityId) =>
          this.networkPlayerStoreService.selectEntityById$(entityId || '').pipe(
            tap((entity) => {
              this.updateEntityState(entity);
              this.updateFormGroupState(
                this.networkPlayerFormUtil.createFormGroup(entity)
              );
            })
          )
        )
      );
    }
  );

  private readonly fetchSportPlayers = this.effect(() => {
    return this.sportPlayerStoreService.selectEntities$().pipe(
      tap((sportPlayers) => {
        this.updateSportPlayersState(sportPlayers);
      })
    );
  });

  private readonly fetchSportNetwork = (sportNetworkId: string | undefined) =>
    this.effect(() => {
      return this.sportNetworkStoreService
        .selectEntityById$(sportNetworkId || '')
        .pipe(
          tap((sportNetwork) => {
            this.updateSportNetworkState(sportNetwork);
          })
        );
    });

  private readonly fetchUser = (userId: string | undefined) =>
    this.effect(() => {
      return this.userStoreService.selectEntityById$(userId || '').pipe(
        tap((user) => {
          this.updateUserState(user);
        })
      );
    });

  private readonly getDataForSubmit$ = this.select((state) => ({
    entity: state.entity,
    formGroup: state.formGroup,
    user: state.user,
    sportNetwork: state.sportNetwork,
  }));

  private readonly handleCancel = this.effect((cancel$: Observable<void>) => {
    return cancel$.pipe(tap(() => this.cancel()));
  });
  private readonly handleSubmit = this.effect((submit$: Observable<void>) => {
    return submit$.pipe(
      switchMap(() =>
        this.getDataForSubmit$.pipe(
          tap(({ entity, formGroup, user, sportNetwork }) =>
            this.submit(
              entity,
              formGroup as FormGroup,
              user as UserEntity,
              sportNetwork as SportNetworkEntity
            )
          )
        )
      )
    );
  });

  private cancel$$: Subject<void>;
  private submit$$: Subject<void>;

  public readonly entityFormViewModel$: Observable<EntityFormViewModel> =
    this.select({
      formGroup: this.formGroup$.pipe(
        map((formGroup) => formGroup as FormGroup)
      ),
      sportPlayers: this.sportPlayers$,
      sportNetworks: this.sportNetwork$.pipe(
        map((sportNetwork) => (sportNetwork ? [sportNetwork] : []))
      ),
    }).pipe(
      map((entityFormViewModel) =>
        this.extendsEntityFormViewModel(entityFormViewModel)
      )
    );

  public constructor() {
    super({
      formGroup: undefined,
      entity: undefined,
      entityId: undefined,
      sportNetwork: undefined,
      sportPlayers: [],
      user: undefined,
    });

    this.cancel$$ = new Subject();
    this.submit$$ = new Subject();
  }

  public cancel(): void {
    this.router.navigate(['../../../../'], {
      relativeTo: this.activatedRoute,
    });
  }

  public init$(
    entityId: string | undefined,
    sportNetworkId: string | undefined,
    userId: string | undefined
  ): void {
    this.sportPlayerStoreService.dispatchListEntitiesAction();
    this.updateEntityIdState(entityId);
    this.fetchEntity(this.entityId$);
    this.fetchSportNetwork(sportNetworkId);
    this.fetchSportPlayers();
    this.fetchUser(userId);
    this.handleCancel(this.cancel$$.asObservable());
    this.handleSubmit(this.submit$$.asObservable());
  }

  private addEntity(formGroup: FormGroup, subCollectionGroup: string): void {
    this.networkPlayerStoreService.dispatchAddEntityAction(
      this.networkPlayerFormUtil.createEntity(
        formGroup
      ) as NetworkPlayerEntityAdd,
      subCollectionGroup
    );
  }

  private extendsEntityFormViewModel(
    entityFormViewModel: Partial<EntityFormViewModel>
  ): EntityFormViewModel {
    return {
      formGroup: entityFormViewModel.formGroup as FormGroup,
      cancel$$: this.cancel$$,
      submit$$: this.submit$$,
      sportPlayers: entityFormViewModel.sportPlayers as SportPlayerEntity[],
      sportNetworks: entityFormViewModel.sportNetworks as SportNetworkEntity[],
    };
  }

  public submit(
    entity: NetworkPlayerEntity | undefined,
    formGroup: FormGroup,
    user: UserEntity,
    sportNetwork: SportNetworkEntity
  ): void {
    const subCollectionGroup = `${USER_FEATURE_KEY}/${user.uid}/${SPORT_NETWORK_FEATURE_KEY}/${sportNetwork.uid}`;

    if (entity) {
      this.updateEntity(formGroup);
    } else {
      this.addEntity(formGroup, subCollectionGroup);
    }

    this.router.navigate(['../../../..'], {
      relativeTo: this.activatedRoute,
    });
  }

  private updateFormGroupState(formGroup: FormGroup): void {
    this.setState((state) => {
      return {
        ...state,
        formGroup,
      };
    });
  }

  private updateEntity(formGroup: FormGroup): void {
    this.networkPlayerStoreService.dispatchUpdateEntityAction(
      this.networkPlayerFormUtil.updateEntity(formGroup)
    );
  }

  private updateEntityState(entity: NetworkPlayerEntity | undefined): void {
    this.setState((state) => {
      return {
        ...state,
        entity,
      };
    });
  }

  private updateEntityIdState(entityId: string | undefined): void {
    this.setState((state) => {
      return {
        ...state,
        entityId,
      };
    });
  }

  private updateSportNetworkState(
    sportNetwork: SportNetworkEntity | undefined
  ): void {
    this.setState((state) => {
      return {
        ...state,
        sportNetwork,
      };
    });
  }

  private updateSportPlayersState(sportPlayers: SportPlayerEntity[]): void {
    this.setState((state) => {
      return {
        ...state,
        sportPlayers,
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
