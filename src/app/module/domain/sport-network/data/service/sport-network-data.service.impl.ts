
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { SPORT_NETWORK_FEATURE_KEY } from '@app/api/domain/sport-network';
import { EntityDataServiceImpl } from '@app/core/entity';
import { FirestoreDataEngine } from '@app/engine';

@Injectable()
export class SportNetworkDataServiceImpl extends EntityDataServiceImpl {
    public constructor(firestore: Firestore) {
    super(new FirestoreDataEngine(firestore, SPORT_NETWORK_FEATURE_KEY));
  }
}