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
import { SportResultEntity } from '@app/api/domain/sport-result';
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
  sportResult: SportResultEntity | undefined;
}

export interface SportEventFormViewModel extends EntityFormViewModel {
  entity: SportEventEntity | undefined;
  isNewEntity: boolean;
  isOwner: boolean;
  participantTypes: ParticipantTypeEnum[];
  participantsArray: FormControl[];
  permissions: PermissionEntity[];
  resultPermissions: string[];
  selectedParticipantSize: number;
  selectedParticipantType: ParticipantTypeEnum | undefined;
  sportCategories: SportCategoryEntity[];
  sportCategoryRules: SportCategoryRuleEntity[];
  sportPlayers: SportPlayerEntity[];
  sportPlayersMapByUserId: Map<string, SportPlayerEntity>;
  sportResult: SportResultEntity | undefined;
  submit$$: Subject<void>;
}
