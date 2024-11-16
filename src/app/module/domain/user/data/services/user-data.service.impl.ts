import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { USER_FEATURE_KEY } from '@app/api/domain/user';
import { EntityDataServiceImpl } from '@app/core/entity';
import { FirestoreDataEngine, FirestoreDataUtil } from '@app/engine';

@Injectable({ providedIn: 'root' })
export class UserDataServiceImpl extends EntityDataServiceImpl {
  public constructor(firestore: Firestore) {
    super(
      new FirestoreDataEngine(
        firestore,
        USER_FEATURE_KEY,
        inject(FirestoreDataUtil)
      )
    );
  }
}
