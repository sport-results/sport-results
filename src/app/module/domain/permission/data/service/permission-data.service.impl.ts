
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { PERMISSION_FEATURE_KEY } from '@app/api/domain/permission';
import { EntityDataServiceImpl } from '@app/core/entity';
import { FirestoreDataEngine } from '@app/engine';

@Injectable()
export class PermissionDataServiceImpl extends EntityDataServiceImpl {
    public constructor(firestore: Firestore) {
    super(new FirestoreDataEngine(firestore, PERMISSION_FEATURE_KEY));
  }
}