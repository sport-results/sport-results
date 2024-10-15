import { KeyValue } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  SportCategoryRule,
  SportCategoryRuleEntity,
  SportCategoryRuleEntitySimple,
} from '@app/api/domain/sport-category-rule';
import { SPORT_EVENT_FEATURE_KEY } from '@app/api/domain/sport-event';
import { Participant } from '@app/api/domain/sport-player';
import {
  PeriodResult,
  SPORT_RESULT_FEATURE_KEY,
  SportResultEntity,
  SportResultEntityAdd,
  SportResultEntityUpdate,
  SportResultFormUtil,
  SportResultUtilService,
} from '@app/api/domain/sport-result';
import { FormValidatorService } from '@app/core/form';

@Injectable()
export class SportResultFormUtilImpl extends SportResultFormUtil {
  private formBuilder = inject(FormBuilder);

  public createEntity(
    formGroup: FormGroup,
    path?: KeyValue<string, string>[]
  ): SportResultEntityAdd {
    const now = new Date().toISOString();

    return {
      meta: {
        creationDate: now,
        lastUpdated: now,
      },
      periodResults: formGroup.value['periodResults'],
      path: path as KeyValue<string, string>[],
      sportCategoryRule: formGroup.value['sportCategoryRule'],
    };
  }

  public createExtendedEntity(
    formGroup: FormGroup,
    sportCategoryRule: SportCategoryRuleEntity,
    path?: KeyValue<string, string>[]
  ): SportResultEntityAdd {
    return {
      ...this.createEntity(formGroup, path),
      sportCategoryRule,
    };
  }

  public createFormGroup(
    sportResult: SportResultEntity | undefined
  ): FormGroup {
    return this.formBuilder.group({
      uid: [sportResult?.uid],
      meta: [sportResult?.meta],
      path: [sportResult?.path],
      periodResults: [
        sportResult?.periodResults,
        FormValidatorService.required,
      ],
      sportCategoryRule: [sportResult?.sportCategoryRule],
    });
  }

  public createExtendedFormGroup(
    sportResult: SportResultEntity | undefined,
    sportCategoryRule: SportCategoryRule,
    participants: Participant[]
  ): FormGroup {
    const formGroup = this.createFormGroup(sportResult);

    formGroup.setControl(
      'periodResults',
      this.createPeriodResults(
        sportResult?.periodResults,
        sportCategoryRule.periodSize,
        participants
      )
    );

    return formGroup;
  }

  private createPeriodResults(
    periodResults: PeriodResult[] | undefined,
    periodSize: number,
    participants: Participant[]
  ) {
    return this.formBuilder.array(
      periodResults
        ? periodResults.map(
            (periodResult) =>
              new FormControl(periodResult, FormValidatorService.required)
          )
        : [...Array(periodSize)].map((_, index) => {
            return new FormControl({
              index,
              results: participants.map((participant) => ({
                key: participant.uid,
                value: 0,
              })),
            });
          })
    );
  }

  public updateEntity(formGroup: FormGroup): SportResultEntityUpdate {
    return {
      uid: formGroup.value['uid'],
      meta: formGroup.value['meta'],
      path: formGroup.value['path'],
      periodResults: formGroup.value['periodResults'],
      sportCategoryRule: formGroup.value['sportCategoryRule'],
    };
  }

  public createPath(
    path: KeyValue<string, string>[],
    sportEventId: string
  ): KeyValue<string, string>[] {
    return [
      path[0],
      path[1],
      { ...path[2], value: sportEventId },
      { key: SPORT_RESULT_FEATURE_KEY, value: '' },
    ];
  }
}
