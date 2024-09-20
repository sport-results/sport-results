import { KeyValue } from '@angular/common';

import {
    SportCategoryRuleEntity,
    SportCategoryRuleEntityAdd,
    SportCategoryRuleEntityUpdate
} from '@app/api/domain/sport-category-rule';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const addEntity = createAction(
    '[SportCategoryRule Admin] Add SportCategoryRule',
    props<{ sportCategoryRule: SportCategoryRuleEntityAdd }>()
);

export const addEntityFail = createAction(
    '[SportCategoryRule Admin] Add SportCategoryRule Fail',
    props<{ error: string }>()
);

export const addEntitySuccess = createAction(
    '[SportCategoryRule Admin] Add SportCategoryRule Success',
    props<{ sportCategoryRule: SportCategoryRuleEntity }>()
);

export const addEntityToParent = createAction(
    '[SportCategoryRule Admin] Add SportCategoryRule to Parent',
    props<{ sportCategoryRule: SportCategoryRuleEntityAdd, parentEntityId: string }>()
);

export const addEntityToParentFail = createAction(
    '[SportCategoryRule Admin] Add SportCategoryRule to Parent Fail',
    props<{ error: string }>()
);

export const addEntityToParentSuccess = createAction(
    '[SportCategoryRule Admin] Add SportCategoryRule to Parent Success',
    props<{ sportCategoryRule: SportCategoryRuleEntity }>()
);

export const loadEntity = createAction(
    '[SportCategoryRule] Load SportCategoryRule',
    props<{ uid: string }>()
);

export const loadEntitySuccess = createAction(
    '[SportCategoryRule] Load SportCategoryRule Success',
    props<{ sportCategoryRule: SportCategoryRuleEntity | null }>()
);

export const loadEntityFail = createAction(
    '[SportCategoryRule] Load SportCategoryRule Fail',
    props<{ error: string }>()
);

export const changeNewEntityButtonEnabled = createAction(
	'[SportCategoryRule Admin] Change new Entity Button Enabled',
	props<{ enabled: boolean }>()
); 

export const listEntities = createAction(
    '[SportCategoryRule Admin] List SportCategoryRules',
    props<{ pathParams: string[]; queryParams: KeyValue<string, string>[] }>()
);

export const listEntitiesSuccess = createAction(
    '[SportCategoryRule Admin] List SportCategoryRules Success',
    props<{ sportCategoryRules: SportCategoryRuleEntity[] }>()
);

export const listEntitiesFail = createAction(
    '[SportCategoryRule Admin] List SportCategoryRules Fail',
    props<{ error: string }>()
);

export const selectEntity = createAction(
	'[SportCategoryRule Admin] Select SportCategoryRule',
	props<{ sportCategoryRule: SportCategoryRuleEntity | null }>()
);

export const selectEntitySuccess = createAction(
	'[SportCategoryRule Admin] Select SportCategoryRule Success',
	props<{ sportCategoryRule: SportCategoryRuleEntity }>()
);

export const updateEntity = createAction(
    '[SportCategoryRule Admin] Update SportCategoryRule',
    props<{ sportCategoryRule: SportCategoryRuleEntityUpdate }>()
);

export const updateEntitySuccess = createAction(
    '[SportCategoryRule Admin] Update SportCategoryRule Success',
    props<{ sportCategoryRule: Update<SportCategoryRuleEntityUpdate> }>()
);

export const updateEntityFail = createAction(
    '[SportCategoryRule Admin] Update SportCategoryRule Fail',
    props<{ error: string }>()
);
