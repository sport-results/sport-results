
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { SPORT_PLAYER_FEATURE_KEY } from '@app/api/domain/sport-player';
import { EntityDataServiceImpl } from '@app/core/entity';
import { FirestoreDataEngine } from '@app/engine';

@Injectable()
export class SportPlayerDataServiceImpl extends EntityDataServiceImpl {
    public constructor(firestore: Firestore) {
    super(new FirestoreDataEngine(firestore, SPORT_PLAYER_FEATURE_KEY));
  }
}