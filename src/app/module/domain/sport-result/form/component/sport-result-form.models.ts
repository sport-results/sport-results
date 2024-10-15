import { FormControl } from '@angular/forms';
import { SportEventEntity } from '@app/api/domain/sport-event';
import { SportResultEntity } from '@app/api/domain/sport-result';

import {
  EntityFormComponentState,
  EntityFormViewModel,
} from '@app/core/entity';
import { Subject } from 'rxjs';

export interface SportResultFormState
  extends EntityFormComponentState<SportResultEntity> {
    sportEvent: SportEventEntity | undefined;
}

export interface SportResultFormViewModel extends EntityFormViewModel {
  isNewEntity: boolean;
  isOwner: boolean;
  periodResultControls: FormControl[];
  submit$$: Subject<void>;
  sportEvent: SportEventEntity | undefined;
  headerItems: string[];
}
