import { KeyValue } from '@angular/common';

import {
    SportCategoryEntity,
    SportCategoryEntityAdd,
    SportCategoryEntityUpdate
} from '@app/api/domain/sport-category';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const addEntity = createAction(
    '[SportCategory Admin] Add SportCategory',
    props<{ sportCategory: SportCategoryEntityAdd }>()
);

export const addEntityFail = createAction(
    '[SportCategory Admin] Add SportCategory Fail',
    props<{ error: string }>()
);

export const addEntitySuccess = createAction(
    '[SportCategory Admin] Add SportCategory Success',
    props<{ sportCategory: SportCategoryEntity }>()
);

export const loadEntity = createAction(
    '[SportCategory] Load SportCategory',
    props<{ uid: string }>()
);

export const loadEntitySuccess = createAction(
    '[SportCategory] Load SportCategory Success',
    props<{ sportCategory: SportCategoryEntity | null }>()
);

export const loadEntityFail = createAction(
    '[SportCategory] Load SportCategory Fail',
    props<{ error: string }>()
);

export const changeNewEntityButtonEnabled = createAction(
	'[SportCategory Admin] Change new Entity Button Enabled',
	props<{ enabled: boolean }>()
); 

export const listEntities = createAction(
    '[SportCategory Admin] List SportCategorys',
    props<{ pathParams: string[]; queryParams: KeyValue<string, string>[] }>()
);

export const listEntitiesSuccess = createAction(
    '[SportCategory Admin] List SportCategorys Success',
    props<{ sportCategorys: SportCategoryEntity[] }>()
);

export const listEntitiesFail = createAction(
    '[SportCategory Admin] List SportCategorys Fail',
    props<{ error: string }>()
);

export const selectEntity = createAction(
	'[SportCategory Admin] Select SportCategory',
	props<{ sportCategory: SportCategoryEntity | null }>()
);

export const selectEntitySuccess = createAction(
	'[SportCategory Admin] Select SportCategory Success',
	props<{ sportCategory: SportCategoryEntity }>()
);

export const updateEntity = createAction(
    '[SportCategory Admin] Update SportCategory',
    props<{ sportCategory: SportCategoryEntityUpdate }>()
);

export const updateEntitySuccess = createAction(
    '[SportCategory Admin] Update SportCategory Success',
    props<{ sportCategory: Update<SportCategoryEntityUpdate> }>()
);

export const updateEntityFail = createAction(
    '[SportCategory Admin] Update SportCategory Fail',
    props<{ error: string }>()
);
