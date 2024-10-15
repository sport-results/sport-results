import { Observable, tap } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  SportResultEntity,
  SportResultEntityAdd,
  SportResultEntityUpdate,
  SportResultStoreService,
  SportResultFormUtil,
} from '@app/api/domain/sport-result';

import { inject, Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { EntityFormComponentStore } from '@app/core/entity';
import { KeyValue } from '@angular/common';

import {
  SportResultFormState,
  SportResultFormViewModel,
} from './sport-result-form.models';
import { SPORT_EVENT_FEATURE_KEY, SportEventEntity } from '@app/api/domain/sport-event';
import { SportCategoryRuleEntity } from '@app/api/domain/sport-category-rule';

@Injectable()
export class SportResultFormService extends EntityFormComponentStore<
  SportResultFormState,
  SportResultEntityAdd,
  SportResultEntity,
  SportResultEntityUpdate
> {
  protected override entityStoreService = inject(SportResultStoreService);
  protected override entityFormUtil = inject(SportResultFormUtil);

  private readonly sportEvent$ = this.select((state) => state.sportEvent);

  private readonly getDataForSubmit$ = this.select((state) => ({
    entity: state.entity,
    formGroup: state.formGroup,
    user: state.user,
  }));

  private readonly handleSubmit = this.effect((submit$: Observable<void>) => {
    return submit$.pipe(
      switchMap(() =>
        this.getDataForSubmit$.pipe(
          withLatestFrom(this.backUrl$),
          withLatestFrom(this.sportEvent$),
          tap(([[{ entity, formGroup, user }, backUrl], sportEvent]) =>
            this.submit(
              entity,
              formGroup as FormGroup,
              backUrl,
              sportEvent as SportEventEntity
            )
          )
        )
      )
    );
  });

  public readonly entityFormViewModel$: Observable<SportResultFormViewModel> =
    this.select({
      formGroup: this.formGroup$.pipe(
        map((formGroup) => formGroup as FormGroup)
      ),
      isNewEntity: this.isNewEntity$,
      isOwner: this.isOwner$,
      sportEvent: this.sportEvent$,
    }).pipe(
      map((entityFormViewModel) =>
        this.extendsEntityFormViewModel(entityFormViewModel)
      )
    );

  public constructor() {
    super({
      backUrl: '',
      entity: undefined,
      entityId: undefined,
      formGroup: undefined,
      sportEvent: undefined,
      user: undefined,
    });
  }

  public init$(
    entityId: string | undefined,
    userId: string | undefined,
    backUrl: string,
    sportEvent: SportEventEntity | undefined
  ): void {
    super.initForm(entityId, userId, backUrl);

    this.updateSportEventState(sportEvent);
    this.handleSubmit(this.submit$$.asObservable());
    this.createFormGroup(this.entity$);
  }

  private addEntity(
    formGroup: FormGroup,
    subCollectionPath: string,
    path: KeyValue<string, string>[],
    sportCategoryRule: SportCategoryRuleEntity,
  ): void {
    this.entityStoreService.dispatchAddEntityAction(
      this.entityFormUtil.createExtendedEntity(formGroup, sportCategoryRule, path) as SportResultEntityAdd,
      subCollectionPath
    );
  }

  private readonly createFormGroup = this.effect(
    (entity$: Observable<SportResultEntity | undefined>) => {
      return entity$.pipe(
        withLatestFrom(
          this.sportEvent$.pipe(
            map((sportEvent) => sportEvent as SportEventEntity)
          )
        ),
        tap(([entity, sportEvent]) =>
          this.updateFormGroupState(
            this.entityFormUtil.createExtendedFormGroup(
              entity,
              sportEvent?.sportCategoryRule,
              sportEvent?.participants
            )
          )
        )
      );
    }
  );

  private extendsEntityFormViewModel(
    entityFormViewModel: Partial<SportResultFormViewModel>
  ): SportResultFormViewModel {
    const formGroup = entityFormViewModel.formGroup as FormGroup;
    const periodResultControls = this.getPeriodResultsArray(formGroup)
      .controls as FormControl[];
    const sportEvent = entityFormViewModel.sportEvent as SportEventEntity;

    return {
      cancel$$: this.cancel$$,
      formGroup,
      headerItems: [
        'Participants',
        [...Array(sportEvent.sportCategoryRule.periodSize)].map(
          (_, index) => `${index + 1}. period`
        ),
      ].flat(),
      isNewEntity: entityFormViewModel.isNewEntity as boolean,
      isOwner: entityFormViewModel.isOwner as boolean,
      periodResultControls,
      sportEvent,
      submit$$: this.submit$$,
    };
  }

  public submit(
    entity: SportResultEntity | undefined,
    formGroup: FormGroup,
    backUrl: string,
    sportEvent: SportEventEntity
  ): void {
    const subCollectionPath = `${this.createSubCollectionPath(sportEvent.path)}/${SPORT_EVENT_FEATURE_KEY}/${sportEvent.uid}`;

    if (entity) {
      this.updateEntity(formGroup, subCollectionPath);
    } else {
      this.addEntity(
        formGroup,
        subCollectionPath,
        this.entityFormUtil.createPath(sportEvent.path, sportEvent.uid ),
        sportEvent.sportCategoryRule
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

  private updateSportEventState(
    sportEvent: SportEventEntity | undefined
  ): void {
    this.setState((state) => {
      return {
        ...state,
        sportEvent,
      };
    });
  }

  private getPeriodResultsArray(formGroup: FormGroup): FormArray {
    return formGroup.controls['periodResults'] as FormArray;
  }
}
