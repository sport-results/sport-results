import { EntityUtilService } from '../../core';
import {
    SportCategoryEntity,
    SportCategoryEntityAdd,
    SportCategoryEntityUpdate,
    SportCategoryModel,
    SportCategoryModelAdd,
    SportCategoryModelUpdate
} from './sport-category';

export abstract class SportCategoryUtilService extends EntityUtilService<
    SportCategoryEntity,
    SportCategoryEntityAdd,
    SportCategoryEntityUpdate,
    SportCategoryModel,
    SportCategoryModelAdd,
    SportCategoryModelUpdate
> {}
