import { Observable, tap } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  NetworkPlayerEntity,
  NetworkPlayerStoreService,
  NetworkPlayerFormUtil,
  NetworkPlayerEntityAdd,
  NetworkPlayerEntityUpdate,
} from '@app/api/domain/network-player';

import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  SPORT_NETWORK_FEATURE_KEY,
  SportNetworkEntity,
  SportNetworkStoreService,
} from '@app/api/domain/sport-network';
import { USER_FEATURE_KEY, UserEntity } from '@app/api/domain/user';
import {
  SportPlayerEntity,
  SportPlayerStoreService,
} from '@app/api/domain/sport-player';
import {
  EntityFormComponentState,
  EntityFormComponentStore,
  EntityFormViewModel,
} from '@app/core/entity';

export interface NetworkPlayerFormState
  extends EntityFormComponentState<NetworkPlayerEntity> {
  sportNetwork: SportNetworkEntity | undefined;
  sportPlayers: SportPlayerEntity[];
}

export interface NetworkPlayerFormViewModel extends EntityFormViewModel {
  sportPlayers: SportPlayerEntity[];
  sportNetworks: SportNetworkEntity[];
}

@Injectable()
export class NetworkPlayerFormService extends EntityFormComponentStore<
  NetworkPlayerFormState,
  NetworkPlayerEntityAdd,
  NetworkPlayerEntity,
  NetworkPlayerEntityUpdate
> {
  protected override entityStoreService = inject(NetworkPlayerStoreService);
  protected override entityFormUtil = inject(NetworkPlayerFormUtil);
  private sportNetworkStoreService = inject(SportNetworkStoreService);
  private sportPlayerStoreService = inject(SportPlayerStoreService);

  private readonly sportNetwork$ = this.select((state) => state.sportNetwork);
  private readonly sportPlayers$ = this.select((state) => state.sportPlayers);

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

  private readonly getDataForSubmit$ = this.select((state) => ({
    entity: state.entity,
    formGroup: state.formGroup as FormGroup,
    user: state.user,
    sportNetwork: state.sportNetwork,
  }));

  public readonly entityFormViewModel$: Observable<NetworkPlayerFormViewModel> =
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
      backUrl: '',
      formGroup: undefined,
      entity: undefined,
      entityId: undefined,
      sportNetwork: undefined,
      sportPlayers: [],
      user: undefined,
    });
  }

  init$(
    entityId: string | undefined,
    sportNetworkId: string | undefined,
    userId: string | undefined,
    backUrl: string
  ): void {
    super.initForm(entityId, userId, backUrl);

    this.sportPlayerStoreService.dispatchListEntitiesAction();

    this.fetchSportNetwork(sportNetworkId);
    this.fetchSportPlayers();

    this.handleSubmit(this.submit$$.asObservable());

    this.createFormGroup(this.entity$);
  }

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

  private readonly createFormGroup = this.effect(
    (entity$: Observable<NetworkPlayerEntity | undefined>) => {
      return entity$.pipe(
        tap((entity) =>
          this.updateFormGroupState(
            this.entityFormUtil.createFormGroup(entity)
          )
        )
      );
    }
  );

  private addEntity(formGroup: FormGroup, subCollectionGroup: string): void {
    this.entityStoreService.dispatchAddEntityAction(
      this.entityFormUtil.createEntity(
        formGroup
      ) as NetworkPlayerEntityAdd,
      subCollectionGroup
    );
  }

  private extendsEntityFormViewModel(
    entityFormViewModel: Partial<NetworkPlayerFormViewModel>
  ): NetworkPlayerFormViewModel {
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

  private updateEntity(formGroup: FormGroup): void {
    this.entityStoreService.dispatchUpdateEntityAction(
      this.entityFormUtil.updateEntity(formGroup)
    );
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
}
