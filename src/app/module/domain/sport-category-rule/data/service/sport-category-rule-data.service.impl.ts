import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { SPORT_CATEGORY_FEATURE_KEY } from '@app/api/domain/sport-category';
import { EntityDataServiceImpl } from '@app/core/entity';
import { FirestoreDataEngine } from '@app/engine';

@Injectable()
export class SportCategoryRuleDataServiceImpl extends EntityDataServiceImpl {
  public constructor(firestore: Firestore) {
    super(new FirestoreDataEngine(firestore, SPORT_CATEGORY_FEATURE_KEY));
  }
}
