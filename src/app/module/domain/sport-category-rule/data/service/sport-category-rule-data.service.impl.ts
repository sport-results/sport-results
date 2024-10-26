import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { SPORT_CATEGORY_RULE_FEATURE_KEY } from '@app/api/domain/sport-category-rule';
import { EntityDataServiceImpl } from '@app/core/entity';
import { FirestoreDataEngine, FirestoreDataUtil } from '@app/engine';

@Injectable()
export class SportCategoryRuleDataServiceImpl extends EntityDataServiceImpl {
  public constructor(firestore: Firestore) {
    super(new FirestoreDataEngine(firestore, SPORT_CATEGORY_RULE_FEATURE_KEY, inject(FirestoreDataUtil)));
  }
}
