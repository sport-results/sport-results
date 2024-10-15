
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { SPORT_RESULT_FEATURE_KEY } from '@app/api/domain/sport-result';
import { EntityDataServiceImpl } from '@app/core/entity';
import { FirestoreDataEngine } from '@app/engine';

@Injectable()
export class SportResultDataServiceImpl extends EntityDataServiceImpl {
    public constructor(firestore: Firestore) {
    super(new FirestoreDataEngine(firestore, SPORT_RESULT_FEATURE_KEY));
  }
}