import { KeyValue } from '@angular/common';
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

  public createPath(featureKey: string, uid: string, subCollectionPath: string | undefined): string {
    return subCollectionPath
    ? `${subCollectionPath}/${featureKey}/${uid}`
    : `${featureKey}/${uid}`;
  }

  public addEntityIdToPath(
    path: KeyValue<string, string>[],
    id: string
  ): KeyValue<string, string>[] {
    const newPath = [...path];
    newPath[newPath.length - 1].value = id;

    return newPath;
  }
}
