import { KeyValue } from '@angular/common';

import { EntityFormUtil } from '../../core';
import { SportResultEntity } from './sport-result';
import { SportCategoryRule } from '../sport-category-rule';
import { Participant } from '../sport-player';
import { FormGroup } from '@angular/forms';

export abstract class SportResultFormUtil extends EntityFormUtil {
    public abstract createPath(
    userId: string,
  ): KeyValue<string, string>[];

  public abstract createExtendedFormGroup(
    sportResult: SportResultEntity | undefined,
    sportCategoryRule: SportCategoryRule,
    participants: Participant[]
  ): FormGroup
}
