import {
  participantTypes,
  SportCategoryRuleEntity,
  SportCategoryRuleStoreService,
} from '@app/api/domain/sport-category-rule';
import { BehaviorSubject, combineLatest, Observable, tap } from 'rxjs';
import { map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import {
  SportEventEntity,
  SportEventEntityAdd,
  SportEventStoreService,
  SportEventFormUtil,
  SportEventEntityUpdate,
} from '@app/api/domain/sport-event';

import { inject, Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { EntityFormComponentStore } from '@app/core/entity';
import {
  SportCategoryEntity,
  SportCategoryStoreService,
} from '@app/api/domain/sport-category';
import { SportPlayerEntity } from '@app/api/domain/sport-player';
import {
  NetworkPlayerEntity,
  NetworkPlayerStoreService,
} from '@app/api/domain/network-player';
import { USER_FEATURE_KEY, UserEntity } from '@app/api/domain/user';
import { SPORT_NETWORK_FEATURE_KEY } from '@app/api/domain/sport-network';
import { KeyValue } from '@angular/common';
import {
  PermissionEntity,
  PermissionStoreService,
} from '@app/api/domain/permission';
import { SportEventFormState, SportEventFormViewModel } from './sport-event-form.models';

@Injectable()
export class SportEventFormService extends EntityFormComponentStore<
  SportEventFormState,
  SportEventEntityAdd,
  SportEventEntity,
  SportEventEntityUpdate
> {
  protected override entityStoreService = inject(SportEventStoreService);
  protected override entityFormUtil = inject(SportEventFormUtil);
  private networkPlayerStoreService = inject(NetworkPlayerStoreService);
  private permissionStoreService = inject(PermissionStoreService);
  private sportCategoryStoreService = inject(SportCategoryStoreService);
  private sportCategoryRuleStoreService = inject(SportCategoryRuleStoreService);

  private changeSportCategory$$ = new BehaviorSubject<
    SportCategoryEntity | undefined
  >(undefined);

  private changeSportCategoryRule$$ = new BehaviorSubject<
    SportCategoryRuleEntity | undefined
  >(undefined);

  private readonly networkPlayers$ = this.select(
    (state) => state.networkPlayers
  );

  private readonly permissions$ = this.select((state) => state.permissions);

  private readonly sportCategories$ = this.select(
    (state) => state.sportCategories
  );

  private readonly sportCategoryRules$ = this.select(
    (state) => state.sportCategoryRules
  );

  private readonly sportNetworkId$ = this.select(
    (state) => state.sportNetworkId
  );

  private readonly getDataForSubmit$ = this.select((state) => ({
    entity: state.entity,
    formGroup: state.formGroup,
    user: state.user,
    sportNetworkId: state.sportNetworkId,
  }));

  private readonly fetchSportCategories = this.effect(() => {
    return this.sportCategoryStoreService.selectEntities$().pipe(
      tap((sportCategories) => {
        this.updateSportCategoriesState(sportCategories);
      })
    );
  });

  private readonly fetchSportCategoryRules = this.effect(() => {
    return this.sportCategoryRuleStoreService.selectEntities$().pipe(
      tap((sportCategoryRules) => {
        this.updateSportCategoryRulesState(sportCategoryRules);
      })
    );
  });

  private readonly fetchPermissions = this.effect(
    (entity$: Observable<SportEventEntity | undefined>) => {
      this.permissionStoreService.dispatchListEntitiesAction();
      return entity$.pipe(
        tap(
          (entity) =>
            entity?.path &&
            this.permissionStoreService.dispatchListEntitiesAction(
              this.createSubCollectionPath(entity.path, entity.uid)
            )
        ),
        switchMap((entity) => this.permissionStoreService.selectEntitiesByResourceId$(entity?.uid || '')),
        tap((permissions) => {
          this.updatePermissionsState(permissions);
        })
      );
    }
  );

  private readonly updateEntityFields = this.effect(
    (entity$: Observable<SportEventEntity | undefined>) => {
      return entity$.pipe(
        withLatestFrom(this.formGroup$),
        take(1),
        tap(([entity, formGroup]) => {
          if (entity) {
            this.changeSportCategory$$.next(
              entity.sportCategory as SportCategoryEntity
            );

            (formGroup?.get('sportCategoryRule') as FormControl).patchValue(
              entity.sportCategoryRule
            );
          }
        })
      );
    }
  );

  private readonly fetchNetworkPlayers = this.effect(
    (entity$: Observable<SportEventEntity | undefined>) =>
      entity$.pipe(
        withLatestFrom(this.sportNetworkId$),
        withLatestFrom(this.user$),
        tap(([[entity, sportNetworkId], user]) => {
          if (entity) {
            this.networkPlayerStoreService.dispatchListEntitiesAction(
              `${USER_FEATURE_KEY}/${entity?.path[0].value}/${SPORT_NETWORK_FEATURE_KEY}/${entity?.path[1].value}`
            );
          } else {
            this.networkPlayerStoreService.dispatchListEntitiesAction(
              `${USER_FEATURE_KEY}/${user?.uid}/${SPORT_NETWORK_FEATURE_KEY}/${sportNetworkId}`
            );
          }
        }),
        switchMap(([[entity, sportNetworkId], user]) =>
          this.networkPlayerStoreService
            .selectEntitiesBySportNetworkId$(
              entity?.path[1].value || sportNetworkId || ''
            )
            .pipe(
              tap((networkPlayers) => {
                this.updateNetworkPlayersState(networkPlayers);
              })
            )
        )
      )
  );

  private readonly handleSubmit = this.effect((submit$: Observable<void>) => {
    return submit$.pipe(
      switchMap(() =>
        this.getDataForSubmit$.pipe(
          withLatestFrom(this.backUrl$),
          tap(([{ entity, formGroup, sportNetworkId, user }, backUrl]) =>
            this.submit(
              entity,
              formGroup as FormGroup,
              backUrl,
              user as UserEntity,
              sportNetworkId
            )
          )
        )
      )
    );
  });

  public readonly entityFormViewModel$: Observable<SportEventFormViewModel> =
    this.select({
      formGroup: this.formGroup$.pipe(
        map((formGroup) => formGroup as FormGroup)
      ),
      isNewEntity: this.isNewEntity$,
      isOwner: this.isOwner$,
      permissions: this.permissions$,
      sportCategories: this.sportCategories$.pipe(
        map((sportCategories) => sportCategories as SportCategoryEntity[])
      ),
      sportCategoryRules: combineLatest([
        this.sportCategoryRules$,
        this.changeSportCategory$$.asObservable(),
      ]).pipe(
        map(([sportCategoryRules, sportCategory]) => {
          return sportCategoryRules.filter(
            (sportCategoryRule) =>
              sportCategoryRule.sportCategory.uid === sportCategory?.uid
          );
        })
      ),
      sportPlayers: this.networkPlayers$.pipe(
        map((networkPlayers) =>
          networkPlayers.map((networkPlayer) => networkPlayer.sportPlayer)
        )
      ),
      selectedParticipantType: this.changeSportCategoryRule$$.pipe(
        map((sportCategoryRule) => sportCategoryRule?.participantType)
      ),
      selectedParticipantSize: this.changeSportCategoryRule$$.pipe(
        map((sportCategoryRule) => sportCategoryRule?.participantSize)
      ),
    }).pipe(
      map((entityFormViewModel) => {
        return this.extendsEntityFormViewModel(entityFormViewModel);
      })
    );

  public constructor() {
    super({
      formGroup: undefined,
      entity: undefined,
      entityId: undefined,
      backUrl: '',
      networkPlayers: [],
      permissions: [],
      sportCategories: [],
      sportCategoryRules: [],
      sportNetworkId: undefined,
      user: undefined,
    });
  }

  public init$(
    entityId: string | undefined,
    sportNetworkId: string | undefined,
    userId: string | undefined,
    backUrl: string
  ): void {
    super.initForm(entityId, userId, backUrl);

    this.updateSportNetworkIdState(sportNetworkId);

    this.fetchEntity(this.entityId$);
    this.fetchSportCategories();
    this.fetchSportCategoryRules();
    this.fetchNetworkPlayers(this.entity$);
    this.fetchPermissions(this.entity$);

    this.handleSubmit(this.submit$$.asObservable());

    this.createFormGroup(this.entity$);
    this.updateEntityFields(this.entity$);
  }

  private addEntity(
    formGroup: FormGroup,
    subCollectionPath: string,
    userId: string,
    path: KeyValue<string, string>[]
  ): void {
    this.entityStoreService.dispatchAddEntityAction(
      this.entityFormUtil.createEntityWithUser(
        formGroup,
        userId,
        path
      ) as SportEventEntityAdd,
      subCollectionPath
    );
  }

  private readonly createFormGroup = this.effect(
    (entity$: Observable<SportEventEntity | undefined>) => {
      return entity$.pipe(
        tap((entity) =>
          this.updateFormGroupState(
            this.entityFormUtil.createFormGroupWithChange(
              entity,
              this.changeSportCategory$$,
              this.changeSportCategoryRule$$
            )
          )
        )
      );
    }
  );

  private extendsEntityFormViewModel(
    entityFormViewModel: Partial<SportEventFormViewModel>
  ): SportEventFormViewModel {
    const formGroup = entityFormViewModel.formGroup as FormGroup;

    return {
      cancel$$: this.cancel$$,
      formGroup: entityFormViewModel.formGroup as FormGroup,
      isNewEntity: entityFormViewModel.isNewEntity as boolean,
      isOwner: entityFormViewModel.isOwner as boolean,
      participantTypes,
      permissions: entityFormViewModel.permissions as PermissionEntity[],
      participantsArray: (entityFormViewModel.isNewEntity
        ? this.createParticipantsArray(
            formGroup,
            entityFormViewModel.selectedParticipantSize || 0
          )
        : this.getParticipantsArray(formGroup)
      ).controls as FormControl[],
      selectedParticipantType: entityFormViewModel.selectedParticipantType,
      selectedParticipantSize: entityFormViewModel.selectedParticipantSize || 0,
      sportCategories:
        entityFormViewModel.sportCategories as SportCategoryEntity[],
      sportCategoryRules:
        entityFormViewModel.sportCategoryRules as SportCategoryRuleEntity[],
      sportPlayers: entityFormViewModel.sportPlayers as SportPlayerEntity[],
      sportPlayersMapByUserId: this.createSportPlayersMap(entityFormViewModel.sportPlayers as SportPlayerEntity[]),
      submit$$: this.submit$$,
    };
  }

  private createSportPlayersMap(sportPlayers: SportPlayerEntity[]): Map<string, SportPlayerEntity> {
    const sportPlayersMapByUserId = new Map<string, SportPlayerEntity>();

    sportPlayers.forEach((sportPlayer) => {
      if (sportPlayer.userId) {
        sportPlayersMapByUserId.set(sportPlayer.userId, sportPlayer);
      }
    });

    return sportPlayersMapByUserId;
  }

  public submit(
    entity: SportEventEntity | undefined,
    formGroup: FormGroup,
    backUrl: string,
    user: UserEntity,
    sportNetworkId: string | undefined
  ): void {
    const subCollectionPath = `${USER_FEATURE_KEY}/${user.uid}/${SPORT_NETWORK_FEATURE_KEY}/${sportNetworkId}`;
    if (entity) {
      this.updateEntity(formGroup, subCollectionPath);
    } else {
      this.addEntity(
        formGroup,
        subCollectionPath,
        user.uid,
        this.entityFormUtil.createPath(user.uid, sportNetworkId || '')
      );
    }

    this.router.navigate([backUrl], {
      relativeTo: this.activatedRoute,
    });
  }

  protected override updateFormGroupState(formGroup: FormGroup): void {
    this.setState((state) => {
      return {
        ...state,
        formGroup,
      };
    });
  }

  private updateEntity(formGroup: FormGroup, subCollectionPath: string): void {
    this.entityStoreService.dispatchUpdateEntityAction(
      this.entityFormUtil.updateEntity(formGroup),
      subCollectionPath
    );
  }

  private updateSportCategoriesState(
    sportCategories: SportCategoryEntity[]
  ): void {
    this.setState((state) => {
      return {
        ...state,
        sportCategories,
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

  private updatePermissionsState(permissions: PermissionEntity[]): void {
    this.setState((state) => {
      return {
        ...state,
        permissions,
      };
    });
  }

  private updateSportCategoryRulesState(
    sportCategoryRules: SportCategoryRuleEntity[]
  ): void {
    this.setState((state) => {
      return {
        ...state,
        sportCategoryRules,
      };
    });
  }

  private updateSportNetworkIdState(sportNetworkId: string | undefined): void {
    this.setState((state) => {
      return {
        ...state,
        sportNetworkId,
      };
    });
  }

  private createParticipantsArray(
    formGroup: FormGroup,
    participantsNumber: number
  ): FormArray {
    const controls = this.entityFormUtil.createParticipants(participantsNumber);

    formGroup.controls['participants'] = controls;

    return controls;
  }

  private getParticipantsArray(formGroup: FormGroup): FormArray {
    return formGroup.controls['participants'] as FormArray;
  }
}
