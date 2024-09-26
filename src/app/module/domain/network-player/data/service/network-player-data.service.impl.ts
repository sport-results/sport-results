
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { NETWORK_PLAYER_FEATURE_KEY } from '@app/api/domain/network-player';
import { EntityDataServiceImpl } from '@app/core/entity';
import { FirestoreDataEngine } from '@app/engine';

@Injectable()
export class NetworkPlayerDataServiceImpl extends EntityDataServiceImpl {
    public constructor(firestore: Firestore) {
    super(new FirestoreDataEngine(firestore, NETWORK_PLAYER_FEATURE_KEY));
  }
}