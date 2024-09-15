import { EntityDataService } from '../../core';
import { SportCategoryModel, SportCategoryModelAdd, SportCategoryModelUpdate } from './sport-category';

export abstract class SportCategoryDataService extends EntityDataService<
    SportCategoryModel,
    SportCategoryModelAdd,
    SportCategoryModelUpdate
> {}
