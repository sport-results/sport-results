import { KeyValue } from '@angular/common';

import { EntityFormUtil } from '../../core';
import { SportResultEntity, SportResultEntityAdd } from './sport-result';
import { SportCategoryRuleEntity } from '../sport-category-rule';
import { Participant } from '../sport-player';
import { FormGroup } from '@angular/forms';

export abstract class SportResultFormUtil extends EntityFormUtil {
    public abstract createPath(
    path: KeyValue<string, string>[],
    sportEventId: string,
  ): KeyValue<string, string>[];

  public abstract createExtendedEntity(
    formGroup: FormGroup,
    sportCategoryRule: SportCategoryRuleEntity,
    path?: KeyValue<string, string>[]
  ): SportResultEntityAdd;

  public abstract createExtendedFormGroup(
    sportResult: SportResultEntity | undefined,
    sportCategoryRule: SportCategoryRuleEntity,
    participants: Participant[]
  ): FormGroup
}
