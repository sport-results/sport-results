import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
    UserEntity,
    UserEntityAdd,
    UserStoreService,
} from '@app/api/domain/user';
import { select, Store } from '@ngrx/store';

import * as userActions from './user.actions';
import * as fromUser from './user.reducer';
import * as UserSelectors from './user.selectors';
import { KeyValue } from '@angular/common';

@Injectable()
export class UserStoreServiceImpl extends UserStoreService {
    public constructor(private store: Store<fromUser.UserPartialState>) {
        super();
    }

    public dispatchAddEntityAction(user: UserEntityAdd): void {
        this.store.dispatch(userActions.addEntity({ user }));
    }

    public override dispatchLoadEntityAction(uid: string): void {
        this.store.dispatch(userActions.loadEntity({ uid }))
    }

    public override dispatchChangeNewEntityButtonEnabled(
        enabled: boolean
    ): void {
        this.store.dispatch(
            userActions.changeNewEntityButtonEnabled({ enabled })
        );
    }

    public dispatchListEntitiesAction(
        subCollectionPath?: string,
        pathParams?: string[],
        queryParams?: KeyValue<string, string>[]
    ): void {
        this.store.dispatch(
            userActions.listEntities({
                subCollectionPath,
                pathParams: pathParams,
                queryParams: queryParams,
            })
        );
    }

    public dispatchLoadExistedUserAction(user: UserEntity): void {
        this.store.dispatch(userActions.loadExistedUser({ user }));
    }

    public dispatchSelectEntityAction(user: UserEntity | null): void {
        this.store.dispatch(userActions.selectEntity({ user }));
    }

    public override dispatchSetSelectedEntityIdAction(entityId: string): void {
        this.store.dispatch(
            userActions.setSelectedEntityId({ userId: entityId })
        );
    }

    public dispatchUpdateEntityAction(user: UserEntity): void {
        this.store.dispatch(userActions.updateEntity({ user }));
    }

    public override isLoading$(): Observable<boolean> {
        throw new Error('Method not implemented.');
    }

    public override selectEntities$(): Observable<UserEntity[]> {
        return this.store.pipe(select(UserSelectors.getAllEntities));
    }

    public override selectEntityById$(
        entityId: string
    ): Observable<UserEntity | undefined> {
        return this.store.pipe(select(UserSelectors.getEntityById(entityId)));
    }

    public override selectNewEntityButtonEnabled$(): Observable<boolean> {
        return this.store.pipe(select(UserSelectors.isNewEntityButtonEnabled));
    }

    public override selectSelectedEntity$(): Observable<UserEntity | null> {
        throw new Error('Method not implemented.');
    }

    public selectSelectedEntityID$(): Observable<string> {
        return this.store.pipe(select(UserSelectors.getSelectedId));
    }

    public override selectSelectedEntityId$(): Observable<string> {
        throw new Error('Method not implemented.');
    }
}
