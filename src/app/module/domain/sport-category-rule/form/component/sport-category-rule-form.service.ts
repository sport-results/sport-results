import { Observable, tap } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ParticipantTypeEnum,
  participantTypes,
  PeriodTypeEnum,
  periodTypes,
  SportCategoryRuleEntity,
  SportCategoryRuleEntityAdd,
  SportCategoryRuleEntityUpdate,
  SportCategoryRuleFormUtil,
  SportCategoryRuleStoreService,
} from '@app/api/domain/sport-category-rule';
import {
  SPORT_CATEGORY_FEATURE_KEY,
  SportCategoryEntity,
  SportCategoryStoreService,
} from '@app/api/domain/sport-category';
import {
  EntityFormComponentState,
  EntityFormComponentStore,
  EntityFormViewModel,
} from '@app/core/entity';

export interface SportCategoryRuleFormState
  extends EntityFormComponentState<SportCategoryRuleEntity> {
  parentEntityId: string | undefined;
  parentEntity: SportCategoryEntity | undefined;
}

export interface SportCategoryRuleFormViewModel extends EntityFormViewModel {
  periodTypes: PeriodTypeEnum[];
  participantTypes: ParticipantTypeEnum[];
}

@Injectable()
export class SportCategoryRuleFormService extends EntityFormComponentStore<
  SportCategoryRuleFormState,
  SportCategoryRuleEntityAdd,
  SportCategoryRuleEntity,
  SportCategoryRuleEntityUpdate
> {
  protected override entityStoreService = inject(SportCategoryRuleStoreService);
  protected override entityFormUtil = inject(SportCategoryRuleFormUtil);
  private sportCategoryStoreService = inject(SportCategoryStoreService);

  private readonly parentEntityId$ = this.select(
    (state) => state.parentEntityId
  );

  private readonly getDataForSubmit$ = this.select((state) => ({
    entity: state.entity,
    parentEntity: state.parentEntity,
    formGroup: state.formGroup,
  }));

  private readonly fetchParentEntity = this.effect(
    (parentEntityId$: Observable<string | undefined>) => {
      return parentEntityId$.pipe(
        switchMap((parentEntityId) =>
          this.sportCategoryStoreService
            .selectEntityById$(parentEntityId || '')
            .pipe(
              tap((parentEntity) => {
                this.updateParentEntityState(parentEntity);
              })
            )
        )
      );
    }
  );

  private readonly handleSubmit = this.effect((submit$: Observable<void>) => {
    return submit$.pipe(
      withLatestFrom(this.backUrl$),
      switchMap(([_, backUrl]) =>
        this.getDataForSubmit$.pipe(
          tap(({ entity, parentEntity, formGroup }) =>
            this.submit(entity, parentEntity, formGroup as FormGroup, backUrl)
          )
        )
      )
    );
  });

  public readonly entityFormViewModel$: Observable<SportCategoryRuleFormViewModel> =
    this.select({
      formGroup: this.formGroup$.pipe(
        map((formGroup) => formGroup as FormGroup)
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
      parentEntityId: undefined,
      parentEntity: undefined,
      backUrl: '',
      user: undefined,
    });
  }

  public init$(
    entityId: string | undefined,
    userId: string | undefined,
    backUrl: string,
    parentEntityId: string | undefined
  ): void {
    super.initForm(entityId, userId, backUrl);

    this.updateParentEntityIdState(parentEntityId);
    this.fetchParentEntity(this.parentEntityId$);
    this.handleSubmit(this.submit$$.asObservable());

    this.createFormGroup(this.entity$);
  }

  private addEntity(
    formGroup: FormGroup,
    parentEntity: SportCategoryEntity | undefined
  ): void {
    if (!parentEntity) {
      throw new Error('No parent entity');
    }
    this.entityStoreService.dispatchAddEntityAction(
      this.entityFormUtil.createEntity(
        formGroup,
        parentEntity
      ) as SportCategoryRuleEntityAdd,
      `${SPORT_CATEGORY_FEATURE_KEY}/${parentEntity.uid}`
    );
  }

  private readonly createFormGroup = this.effect(
    (entity$: Observable<SportCategoryRuleEntity | undefined>) => {
      return entity$.pipe(
        tap((entity) =>
          this.updateFormGroupState(this.entityFormUtil.createFormGroup(entity))
        )
      );
    }
  );

  private extendsEntityFormViewModel(
    entityFormViewModel: Partial<SportCategoryRuleFormViewModel>
  ): SportCategoryRuleFormViewModel {
    return {
      formGroup: entityFormViewModel.formGroup as FormGroup,
      cancel$$: this.cancel$$,
      submit$$: this.submit$$,
      participantTypes,
      periodTypes,
    };
  }

  public submit(
    entity: SportCategoryRuleEntity | undefined,
    parentEntity: SportCategoryEntity | undefined,
    formGroup: FormGroup,
    backUrl: string,
  ): void {
    if (entity) {
      this.updateEntity(formGroup, parentEntity);
    } else {
      this.addEntity(formGroup, parentEntity);
    }

    this.router.navigate([backUrl], {
      relativeTo: this.activatedRoute,
    });
  }

  private updateEntity(
    formGroup: FormGroup,
    parentEntity: SportCategoryEntity | undefined
  ): void {
    this.entityStoreService.dispatchUpdateEntityAction(
      this.entityFormUtil.updateEntity(formGroup),
      `${SPORT_CATEGORY_FEATURE_KEY}/${parentEntity?.uid}`
    );
  }

  private updateParentEntityState(
    parentEntity: SportCategoryEntity | undefined
  ): void {
    this.setState((state) => {
      return {
        ...state,
        parentEntity,
      };
    });
  }

  private updateParentEntityIdState(parentEntityId: string | undefined): void {
    this.setState((state) => {
      return {
        ...state,
        parentEntityId,
      };
    });
  }
}
