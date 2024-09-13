import { Observable } from 'rxjs';

import { KeyValue } from '@angular/common';
import {
    collection,
    collectionData,
    collectionGroup,
    CollectionReference,
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
import { SearchParams } from '@app/api/core/search';

export class FirestoreDataEngine extends DataEngine {
    protected collection!: CollectionReference<EntityModel>;

    public constructor(
        protected firestore: Firestore,
        protected featureKey: string
    ) {
        super();

        this.collection = collection(this.firestore, this.featureKey) as  CollectionReference<EntityModel>;
    }

    public override add$(entityAdd: EntityModelAdd): Observable<EntityModel> {
        const uid = doc(collection(this.firestore, 'id')).id;
        const newEntity = {
            ...entityAdd,
            uid,
        };

        return new Observable((subscriber) => {
            setDoc(doc(this.collection, uid), newEntity).then(() => {
                subscriber.next({ ...newEntity } as unknown as EntityModel);
            });
        });
    }

    public override delete$(entity: EntityModel): Observable<EntityModel> {
        return this.update$(entity);
    }

    public override list$(
        pathParams: string[],
        queryParams: KeyValue<string, string>[]
    ): Observable<EntityModel[]> {
        const pathParamsString = pathParams.join('/');
        const queryParamsString = queryParams
            .map((param) => param.key + '=' + param.value)
            .join('&');

            return collectionData<EntityModel>(
                collectionGroup(this.firestore, this.featureKey) as Query<EntityModel>,
                {
                    idField: 'uid',
                }
            );
    }

    public listByIds$(ids: string[]): Observable<EntityModel[]> {
		const entitiesQuery = query(
			collectionGroup(this.firestore, this.featureKey),
			where('uid', 'in', ids)
		);

		return new Observable((subscriber) => {
			getDocs(entitiesQuery).then((snapshot) => {
				subscriber.next(
					snapshot.docs.map(
                        (doc) =>
                            ({
                                ...doc.data(),
                            } as unknown as EntityModel)
                    )
				);
			});
		});
	}

    public search$(params: SearchParams): Observable<EntityModel[]> {
		const queries: QueryConstraint[] = params.map((param) =>
			where(param.query.field, param.query.operation, param.query.value)
		);

		const entityQuery = query(
			collectionGroup(this.firestore, this.featureKey),
			...queries
		);

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

    public override load$(uid: string): Observable<EntityModel | undefined> {
        const entityDocument = doc(this.firestore, `${this.featureKey}/${uid}`);

		return docData(entityDocument, {
			idField: 'uid',
		}) as Observable<EntityModel>;
    }

    public override update$(
        entityUpdate: EntityModelUpdate
    ): Observable<EntityModelUpdate> {
        const newEntity: EntityModel = {
            ...entityUpdate,
        } as EntityModel;

        return new Observable((subscriber) => {
            setDoc(doc(this.collection, entityUpdate.uid), newEntity).then(
                () => {
                    subscriber.next({
                        ...newEntity,
                    } as unknown as EntityModelUpdate);
                }
            );
        });
    }
}
