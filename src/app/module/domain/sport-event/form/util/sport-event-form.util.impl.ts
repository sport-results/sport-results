import { Subject, takeUntil } from 'rxjs';

import { KeyValue } from '@angular/common';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SportCategoryEntity } from '@app/api/domain/sport-category';
import { SportCategoryRuleEntity } from '@app/api/domain/sport-category-rule';

import {
  SPORT_EVENT_FEATURE_KEY,
  SportEventEntity,
  SportEventEntityAdd,
  SportEventEntityUpdate,
  SportEventFormUtil,
  SportEventUtilService,
} from '@app/api/domain/sport-event';
import { SPORT_NETWORK_FEATURE_KEY } from '@app/api/domain/sport-network';
import { USER_FEATURE_KEY } from '@app/api/domain/user';

import { FormValidatorService } from '@app/core/form';

@Injectable()
export class SportEventFormUtilImpl
  extends SportEventFormUtil
  implements OnDestroy
{
  private formBuilder = inject(FormBuilder);
  
  entityUtilService = inject(SportEventUtilService);
  destroy: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public createEntity(formGroup: FormGroup, path?: KeyValue<string, string>[]): SportEventEntityAdd {
    const now = new Date().toISOString();
    const user = this.entityUtilService.user$$$();

    return {
      meta: {
        creationDate: now,
        lastUpdated: now,
        ownerId: user?.uid,
      },
      location: formGroup.value['location'],
      dateTime: formGroup.value['dateTime'],
      participants: formGroup.value['participants'],
      path: path as KeyValue<string, string>[],
      sportCategory: formGroup.value['sportCategory'],
      sportCategoryRule: formGroup.value['sportCategoryRule'],
    };
  }

  public createEntityWithUser(
    formGroup: FormGroup,
    userId: string,
    path: KeyValue<string, string>[]
  ): SportEventEntityAdd {
    const sportEvent = this.createEntity(formGroup);

    return {
      ...sportEvent,
      meta: {
        ...sportEvent.meta,
        ownerId: userId,
      },
    };
  }

  public createFormGroup(sportEvent: SportEventEntity | undefined): FormGroup {
    return this.formBuilder.group({
      uid: new FormControl(sportEvent?.uid),
      meta: new FormControl(sportEvent?.meta),
      location: new FormControl(sportEvent?.location),
      dateTime: new FormControl(
        sportEvent?.dateTime,
        FormValidatorService.required
      ),
      participants: this.formBuilder.array(
        (sportEvent?.participants || []).map(
          (participant) =>
            new FormControl(participant, FormValidatorService.required)
        )
      ),
      sportCategory: new FormControl(
        sportEvent?.sportCategory,
        FormValidatorService.required
      ),
      sportCategoryRule: new FormControl(
        sportEvent?.sportCategoryRule,
        FormValidatorService.required
      ),
    });
  }

  public createFormGroupWithChange(
    sportEvent: SportEventEntity | undefined,
    changeSportCategory$$: Subject<SportCategoryEntity | undefined>,
    changeSportCategoryRule$$: Subject<SportCategoryRuleEntity | undefined>
  ): FormGroup {
    const formGroup = this.createFormGroup(sportEvent);
    const sportCategory = formGroup.get('sportCategory') as FormControl;

    sportCategory.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe((value) => {
        changeSportCategory$$.next(value);
      });

    const sportCategoryRule = formGroup.get('sportCategoryRule') as FormControl;

    sportCategoryRule.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe((value: SportCategoryRuleEntity | undefined) => {
        changeSportCategoryRule$$.next(value);
      });

    return formGroup;
  }

  public updateEntity(formGroup: FormGroup): SportEventEntityUpdate {
    return {
      dateTime: formGroup.value['dateTime'],
      location: formGroup.value['location'],
      meta: { ...formGroup.value['meta'] },
      participants: formGroup.value['participants'],
      sportCategory: formGroup.value['sportCategory'],
      sportCategoryRule: formGroup.value['sportCategoryRule'],
      uid: formGroup.value['uid'],
    };
  }

  public createParticipants(participantsNumber: number): FormArray {
    const newControls = [];

    for (let i = 0; i < participantsNumber; i++) {
      newControls.push(new FormControl(undefined));
    }

    return this.formBuilder.array(newControls);
  }

  public createPath(
    userId: string,
    sportNetworkId: string,
  ): KeyValue<string, string>[] {
    return [
      { key: USER_FEATURE_KEY, value: userId },
      { key: SPORT_NETWORK_FEATURE_KEY, value: sportNetworkId },
      { key: SPORT_EVENT_FEATURE_KEY, value: '' },
    ];
  }
}
