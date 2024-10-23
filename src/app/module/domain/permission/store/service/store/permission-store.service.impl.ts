import { Observable } from 'rxjs';

import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { SearchParam } from '@app/api/core/search';
import {
  PermissionEntity,
  PermissionEntityAdd,
  PermissionEntityUpdate,
  PermissionStoreService,
} from '@app/api/domain/permission';
import { select, Store } from '@ngrx/store';

import * as permissionActions from '../../state/permission.actions';
import * as fromPermission from '../../state/permission.reducer';
import * as PermissionSelectors from '../../state/permission.selectors';

@Injectable()
export class PermissionStoreServiceImpl extends PermissionStoreService {
  public constructor(
    private store: Store<fromPermission.PermissionPartialState>
  ) {
    super();
  }

  public dispatchAddEntityAction(
    permission: PermissionEntityAdd,
    subCollectionPath?: string
  ): void {
    this.store.dispatch(
      permissionActions.addEntity({ permission, subCollectionPath })
    );
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
    this.store.dispatch(
      permissionActions.listEntities({
        subCollectionPath,
        pathParams: pathParams,
        queryParams: queryParams,
      })
    );
  }

  public override dispatchResetAction(): void {
    this.store.dispatch(permissionActions.reset());
  }

  public dispatchSearchEntitiesByCollectionGroupAction(
    searchParams: SearchParam[]
  ): void {
    this.store.dispatch(
      permissionActions.searchEntitiesByCollectionGroup({
        searchParams,
      })
    );
  }

  public dispatchSelectEntityAction(permission: PermissionEntity | null): void {
    this.store.dispatch(permissionActions.selectEntity({ permission }));
  }

  public dispatchUpdateEntityAction(
    permission: PermissionEntityUpdate,
    subCollectionPath?: string
  ): void {
    this.store.dispatch(
      permissionActions.updateEntity({
        permission,
        subCollectionPath,
      })
    );
  }

  public isLoading$(): Observable<boolean> {
    return this.store.pipe(select(PermissionSelectors.getEntityLoading));
  }

  public selectEntities$(): Observable<PermissionEntity[]> {
    return this.store.pipe(select(PermissionSelectors.getAll));
  }

  public selectEntitiesByResourceId$(
    resourceId: string
  ): Observable<PermissionEntity[]> {
    return this.store.pipe(
      select(PermissionSelectors.getEntitiesByResourceId(resourceId))
    );
  }

  public selectEntitiesByUserId$(
    userId: string
  ): Observable<PermissionEntity[]> {
    return this.store.pipe(
      select(PermissionSelectors.getEntitiesByUserId(userId))
    );
  }

  public selectEntity$(uid: string): Observable<PermissionEntity | undefined> {
    return this.store.pipe(select(PermissionSelectors.getEntityById(uid)));
  }

  public override selectEntityById$(
    entityId: string
  ): Observable<PermissionEntity | undefined> {
    return this.store.pipe(select(PermissionSelectors.getEntityById(entityId)));
  }

  public selectNewEntityButtonEnabled$(): Observable<boolean> {
    return this.store.pipe(
      select(PermissionSelectors.isNewEntityButtonEnabled)
    );
  }

  public selectSelectedEntity$(): Observable<PermissionEntity | null> {
    return this.store.pipe(select(PermissionSelectors.getSelectedEntity));
  }
}
