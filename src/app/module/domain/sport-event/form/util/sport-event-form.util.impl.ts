import { inject, Injectable, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SportCategoryEntity } from '@app/api/domain/sport-category';
import { SportCategoryRuleEntity } from '@app/api/domain/sport-category-rule';

import {
  SportEventEntity,
  SportEventEntityAdd,
  SportEventEntityUpdate,
  SportEventFormUtil,
} from '@app/api/domain/sport-event';

import { FormValidatorService } from '@app/core/form';
import { Subject, takeUntil } from 'rxjs';

@Injectable()
export class SportEventFormUtilImpl
  extends SportEventFormUtil
  implements OnDestroy
{
  destroy: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
  private formBuilder = inject(FormBuilder);

  public createEntity(formGroup: FormGroup): SportEventEntityAdd {
    const now = new Date().toISOString();

    return {
      meta: {
        creationDate: now,
        lastUpdated: now,
      },
      location: formGroup.value['location'],
      dateTime: formGroup.value['dateTime'],
      participants: formGroup.value['participants'],
      sportCategory: formGroup.value['sportCategory'],
      sportCategoryRule: formGroup.value['sportCategoryRule'],
    };
  }

  public createEntityWithUser(
    formGroup: FormGroup,
    userId: string
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
      participants: new FormArray(
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
        sportEvent?.sportCategory,
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
}
