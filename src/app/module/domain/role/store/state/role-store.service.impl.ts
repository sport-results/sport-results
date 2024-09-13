import { Observable } from 'rxjs';

import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import {
    RoleEntity,
    RoleEntityAdd,
    RoleEntityUpdate,
    RoleStoreService,
} from '@app/api/domain/role';
import { select, Store } from '@ngrx/store';

import * as roleActions from './role.actions';
import * as fromRole from './role.reducer';
import * as RoleSelectors from './role.selectors';

@Injectable()
export class RoleStoreServiceImpl extends RoleStoreService {
    public constructor(private store: Store<fromRole.RolePartialState>) {
        super();
    }

    public dispatchAddEntityAction(role: RoleEntityAdd): void {
        this.store.dispatch(roleActions.addEntity({ role }));
    }

    public dispatchChangeNewEntityButtonEnabled(enabled: boolean): void {
        this.store.dispatch(
            roleActions.changeNewEntityButtonEnabled({ enabled })
        );
    }

    public dispatchGetEntityAction(uid: string): void {
        this.store.dispatch(roleActions.loadEntity({ uid }));
    }

    public dispatchListEntitiesAction(
        pathParams?: string[],
        queryParams?: KeyValue<string, string>[]
    ): void {
        this.store.dispatch(
            roleActions.listEntities({
                pathParams: pathParams || [],
                queryParams: queryParams || [],
            })
        );
    }

    public dispatchSelectEntityAction(role: RoleEntity | null): void {
        this.store.dispatch(roleActions.selectEntity({ role }));
    }

    public dispatchUpdateEntityAction(role: RoleEntityUpdate): void {
        this.store.dispatch(roleActions.updateEntity({ role }));
    }

    public isLoading$(): Observable<boolean> {
        return this.store.pipe(select(RoleSelectors.getRoleLoading));
    }

    public override selectEntities$(): Observable<RoleEntity[]> {
        return this.store.pipe(select(RoleSelectors.getAllRole));
    }

    public selectEntity$(uid: string): Observable<RoleEntity | undefined> {
        return this.store.pipe(select(RoleSelectors.selectRoleById(uid)));
    }

    public override selectEntityById$(
        entityId: string
    ): Observable<RoleEntity | undefined> {
        return this.store.pipe(select(RoleSelectors.selectRoleById(entityId)));
    }

    public selectNewEntityButtonEnabled$(): Observable<boolean> {
        return this.store.pipe(select(RoleSelectors.isNewEntityButtonEnabled));
    }

    public override selectSelectedEntity$(): Observable<RoleEntity | null> {
        return this.store.pipe(select(RoleSelectors.selectSelectedEntity));
    }
}
