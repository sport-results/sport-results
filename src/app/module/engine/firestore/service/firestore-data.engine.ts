import { Observable } from 'rxjs';

import { KeyValue } from '@angular/common';
import {
  collection,
  collectionData,
  collectionGroup,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore,
  getDocs,
  Query,
  query,
  QueryConstraint,
  setDoc,
  where,
} from '@angular/fire/firestore';
import {
  EntityModel,
  EntityModelAdd,
  EntityModelUpdate,
} from '@app/api/core/entity';
import { DataEngine } from '@app/api/engine';
import { SearchParam, SearchParams } from '@app/api/core/search';
import { FirestoreDataUtil } from './firestore-data.util';

export class FirestoreDataEngine extends DataEngine {
  protected collection!: CollectionReference<EntityModel>;
  protected idCollection: CollectionReference<EntityModel>;

  public constructor(
    protected firestore: Firestore,
    protected featureKey: string,
    protected firestoreDataUtil: FirestoreDataUtil
  ) {
    super();

    this.collection = this.firestoreDataUtil.createCollectionReference<EntityModel>(
      this.firestore,
      this.featureKey
    );
    this.idCollection = this.firestoreDataUtil.createCollectionReference<EntityModel>(
      this.firestore,
      'id'
    );
  }

  public override add$(
    entityAdd: EntityModelAdd,
    subCollectionPath?: string
  ): Observable<EntityModel> {
    const uid = doc(this.idCollection).id;
    const newEntity = {
      ...entityAdd,
      uid,
    };

    return new Observable((subscriber) => {
      const path = this.firestoreDataUtil.createPath(
        this.featureKey,
        uid,
        subCollectionPath
      );

      setDoc(doc(this.firestore, path), newEntity)
        .then(() => {
          subscriber.next({ ...newEntity } as unknown as EntityModel);
        })
        .catch((error) => {
          subscriber.error(error);
        });
    });
  }

  public override delete$(uid: string, subCollectionPath?: string): Observable<string> {
    const path = this.firestoreDataUtil.createPath(
      this.featureKey,
      uid,
      subCollectionPath
    );
    return new Observable((subscriber) => {
      deleteDoc(doc(this.firestore, path)).then(() => {
        subscriber.next(uid);
      })
      .catch((error) => {
        subscriber.error(error);
      });
    });
  }

  public override list$(
    subCollectionPath?: string,
    pathParams?: string[],
    queryParams?: KeyValue<string, string>[]
  ): Observable<EntityModel[]> {
    const pathParamsString = pathParams && pathParams.join('/');
    const queryParamsString =
      queryParams &&
      queryParams.map((param) => param.key + '=' + param.value).join('&');

    return collectionData<EntityModel>(
      collection(
        this.firestore,
        subCollectionPath
          ? `${subCollectionPath}/${this.featureKey}`
          : this.featureKey
      ) as Query<EntityModel>,
      {
        idField: 'uid',
      }
    );
  }

  public listByIds$(ids: string[]): Observable<EntityModel[]> {
    const entitiesQuery = query(this.collection, where('uid', 'in', ids));

    return new Observable((subscriber) => {
      getDocs(entitiesQuery)
        .then((snapshot) => {
          subscriber.next(
            snapshot.docs.map(
              (doc) =>
                ({
                  ...doc.data(),
                } as unknown as EntityModel)
            )
          );
        })
        .catch((error) => {
          subscriber.error(error);
        });
    });
  }

  public listByCollectionGroup$(
    ids?: string[]
  ): Observable<EntityModel[]> {
    const entityCollectionGroup = collectionGroup(
      this.firestore,
      this.featureKey
    );
    const entitiesQuery =
      ids && ids.length > 0
        ? query(entityCollectionGroup, where('uid', 'in', ids))
        : query(entityCollectionGroup);

    return new Observable((subscriber) => {
      getDocs(entitiesQuery)
        .then((snapshot) => {
          subscriber.next(
            snapshot.docs.map(
              (doc) =>
                ({
                  ...doc.data(),
                } as unknown as EntityModel)
            )
          );
        })
        .catch((error) => {
          subscriber.error(error);
        });
    });
  }

  public search$(params: SearchParams): Observable<EntityModel[]> {
    const queries: QueryConstraint[] = params.map((param) =>
      where(param.query.field, param.query.operation, param.query.value)
    );

    const entityQuery = query(this.collection, ...queries);

    return this.searchByQuery(entityQuery);
  }

  public override load$(uid: string): Observable<EntityModel | undefined> {
    const entityDocument = this.firestoreDataUtil.createDocumentReference(
      this.firestore,
      this.featureKey,
      uid
    );

    return docData(entityDocument, {
      idField: 'uid',
    }) as Observable<EntityModel>;
  }

  public searchByCollectionGroup$(
    params: SearchParam[]
  ): Observable<EntityModel[]> {
    const queries: QueryConstraint[] = params.map((param) =>
      where(param.query.field, param.query.operation, param.query.value)
    );

    const entityQuery = query(
      collectionGroup(this.firestore, this.featureKey),
      ...queries
    );

    return this.searchByQuery(entityQuery);
  }

  public override update$(
    entityUpdate: EntityModelUpdate,
    subCollectionPath?: string
  ): Observable<EntityModelUpdate> {
    const newEntity: EntityModel = {
      ...entityUpdate,
    } as EntityModel;

    return new Observable((subscriber) => {
      const path = this.firestoreDataUtil.createPath(
        this.featureKey,
        entityUpdate.uid,
        subCollectionPath
      );

      setDoc(doc(this.firestore, path), newEntity)
        .then(() => {
          subscriber.next({
            ...newEntity,
          } as unknown as EntityModelUpdate);
        })
        .catch((error) => {
          subscriber.error(error);
        });
    });
  }

  private searchByQuery(entityQuery: Query): Observable<EntityModel[]> {
    return new Observable((subscriber) => {
      getDocs(entityQuery)
        .then((snapshot) => {
          subscriber.next(
            snapshot.docs.map(
              (doc) =>
                ({
                  ...doc.data(),
                } as unknown as EntityModel)
            )
          );
        })
        .catch((error) => {
          subscriber.error(error);
        });
    });
  }
}
