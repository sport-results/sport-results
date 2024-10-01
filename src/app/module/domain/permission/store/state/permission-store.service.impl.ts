import { Observable } from 'rxjs';

import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
    PermissionEntity,
    PermissionEntityAdd,
    PermissionEntityUpdate,
    PermissionStoreService,
} from '@app/api/domain/permission';

import * as permissionActions from './permission.actions';
import * as fromPermission from './permission.reducer';
import * as PermissionSelectors from './permission.selectors';

@Injectable()
export class PermissionStoreServiceImpl extends PermissionStoreService {
    public constructor(private store: Store<fromPermission.PermissionPartialState>) {
        super();
    }

    public dispatchAddEntityAction(
        permission: PermissionEntityAdd,
        parentEntityId?: string
    ): void {
        this.store.dispatch(permissionActions.addEntity({ permission,  parentEntityId }));
    }

    public dispatchChangeNewEntityButtonEnabled(enabled: boolean): void {
        this.store.dispatch(
            permissionActions.changeNewEntityButtonEnabled({ enabled })
        );
    }

    public dispatchGetEntityAction(uid: string): void {
        this.store.dispatch(permissionActions.loadEntity({ uid }));
    }

    public dispatchListEntitiesAction(
        subCollectionPath?: string,
        pathParams?: string[],
        queryParams?: KeyValue<string, string>[]
    ): void {
        this.store.dispatch(permissionActions.listEntities({
            subCollectionPath,
            pathParams: pathParams,
            queryParams: queryParams,
        }));
    }

    public dispatchSelectEntityAction(permission: PermissionEntity | null): void {
        this.store.dispatch(permissionActions.selectEntity({ permission }));
    }

    public dispatchUpdateEntityAction(
        permission: PermissionEntityUpdate,
        subCollectionPath?: string
    ): void {
        this.store.dispatch(permissionActions.updateEntity({
            permission,
            subCollectionPath
        }));
    }

    public isLoading$(): Observable<boolean> {
        return this.store.pipe(select(PermissionSelectors.getEntityLoading));
    }

    public selectEntity$(
        uid: string
    ): Observable<PermissionEntity | undefined> {
        return this.store.pipe(select(PermissionSelectors.getEntityById(uid)));
    }

    public selectEntities$(): Observable<PermissionEntity[]> {
        return this.store.pipe(select(PermissionSelectors.getAll));
    }

    public override selectEntityById$(
        entityId: string
    ): Observable<PermissionEntity | undefined> {
        return this.store.pipe(select(PermissionSelectors.getEntityById(entityId)));
    }

    public selectNewEntityButtonEnabled$(): Observable<boolean> {
        return this.store.pipe(select(PermissionSelectors.isNewEntityButtonEnabled));
    }

    public selectSelectedEntity$(): Observable<PermissionEntity | null> {
        return this.store.pipe(select(PermissionSelectors.getSelectedEntity));
    }
}
