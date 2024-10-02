import { Subject } from 'rxjs';

import { FormArray, FormGroup } from '@angular/forms';

import { EntityFormUtil } from '../../core';
import { SportEventEntity, SportEventEntityAdd } from './sport-event';
import { SportCategoryEntity } from '../sport-category';
import {
  SportCategoryRuleEntity,
} from '../sport-category-rule';

export abstract class SportEventFormUtil extends EntityFormUtil {
  public abstract createEntityWithUser(
    formGroup: FormGroup,
    userId: string
  ): SportEventEntityAdd;
  public abstract createFormGroupWithChange(
    sportEvent: SportEventEntity | undefined,
    changeSportCategory$$: Subject<SportCategoryEntity | undefined>,
    changeSportCategoryRule$$: Subject<SportCategoryRuleEntity | undefined>
  ): FormGroup;
  public abstract createParticipants(participantsNumber: number): FormArray;
}
