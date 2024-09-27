
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { SPORT_EVENT_FEATURE_KEY } from '@app/api/domain/sport-event';
import { EntityDataServiceImpl } from '@app/core/entity';
import { FirestoreDataEngine } from '@app/engine';

@Injectable()
export class SportEventDataServiceImpl extends EntityDataServiceImpl {
    public constructor(firestore: Firestore) {
    super(new FirestoreDataEngine(firestore, SPORT_EVENT_FEATURE_KEY));
  }
}