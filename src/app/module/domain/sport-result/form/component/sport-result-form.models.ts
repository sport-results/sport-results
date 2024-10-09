import { SportResultEntity } from '@app/api/domain/sport-result';

import {
  EntityFormComponentState,
  EntityFormViewModel,
} from '@app/core/entity';
import { Subject } from 'rxjs';

export interface SportResultFormState
  extends EntityFormComponentState<SportResultEntity> {
}

export interface SportResultFormViewModel extends EntityFormViewModel {
  isNewEntity: boolean;
  isOwner: boolean;
  submit$$: Subject<void>;
}
