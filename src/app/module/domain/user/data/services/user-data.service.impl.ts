import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { USER_FEATURE_KEY } from '@app/api/domain/user';
import { EntityDataServiceImpl } from '@app/core/entity';
import { FirestoreDataEngine } from '@app/engine';

@Injectable()
export class UserDataServiceImpl extends EntityDataServiceImpl {
    public constructor(firestore: Firestore) {
        super(new FirestoreDataEngine(firestore, USER_FEATURE_KEY));
    }
}
