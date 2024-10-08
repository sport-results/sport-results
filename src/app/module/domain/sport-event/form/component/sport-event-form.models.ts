import { FormControl } from '@angular/forms';
import { NetworkPlayerEntity } from '@app/api/domain/network-player';
import { PermissionEntity } from '@app/api/domain/permission';
import { SportCategoryEntity } from '@app/api/domain/sport-category';
import {
  ParticipantTypeEnum,
  SportCategoryRuleEntity,
} from '@app/api/domain/sport-category-rule';
import { SportEventEntity } from '@app/api/domain/sport-event';
import { SportPlayerEntity } from '@app/api/domain/sport-player';
import {
  EntityFormComponentState,
  EntityFormViewModel,
} from '@app/core/entity';
import { Subject } from 'rxjs';

export interface SportEventFormState
  extends EntityFormComponentState<SportEventEntity> {
  networkPlayers: NetworkPlayerEntity[];
  permissions: PermissionEntity[];
  sportCategories: SportCategoryEntity[];
  sportCategoryRules: SportCategoryRuleEntity[];
  sportNetworkId: string | undefined;
}

export interface SportEventFormViewModel extends EntityFormViewModel {
  isNewEntity: boolean;
  isOwner: boolean;
  participantTypes: ParticipantTypeEnum[];
  participantsArray: FormControl[];
  permissions: PermissionEntity[];
  selectedParticipantSize: number;
  selectedParticipantType: ParticipantTypeEnum | undefined;
  sportCategories: SportCategoryEntity[];
  sportCategoryRules: SportCategoryRuleEntity[];
  sportPlayers: SportPlayerEntity[];
  submit$$: Subject<void>;
}
