import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityDataServiceImpl } from '@app/core/entity';
import { JsonDataEngine } from '@app/engine';

export const sportCategoryRuleApiUrl = 'http://localhost:3000/sport-category-rule';

@Injectable()
export class SportCategoryRuleDataServiceImpl extends EntityDataServiceImpl {
    constructor(httpClient: HttpClient) {
      super(new JsonDataEngine(httpClient, sportCategoryRuleApiUrl));
    }
}