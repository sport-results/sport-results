import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  Firestore,
} from '@angular/fire/firestore';

export class FirestoreDataUtil {
  public createCollectionReference<R>(
    firestore: Firestore,
    path: string
  ): CollectionReference<R> {
    return collection(firestore, path) as CollectionReference<R>;
  }

  public createDocumentReference(
    firestore: Firestore,
    featureKey: string,
    uid: string
  ): DocumentReference {
    return doc(firestore, `${featureKey}/${uid}`);
  }
}
