import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ROLE_FEATURE_KEY } from '@app/api/domain/role';
import { EntityDataServiceImpl } from '@app/core/entity';
import { FirestoreDataEngine } from '@app/engine';

@Injectable()
export class RoleDataServiceImpl extends EntityDataServiceImpl {
    public constructor(firestore: Firestore) {
        super(new FirestoreDataEngine(firestore, ROLE_FEATURE_KEY));
    }
}
