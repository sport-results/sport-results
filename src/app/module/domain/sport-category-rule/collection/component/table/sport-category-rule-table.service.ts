import { map, Observable, Subject, tap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleNames } from '@app/api/common';
import {
    SportCategoryRuleEntity,
    SportCategoryRulePermissionsService,
    SportCategoryRuleStoreService,
} from '@app/api/domain/sport-category-rule';
import { ComponentStore } from '@ngrx/component-store';

export type SportCategoryRuleTableState = {
    entities: SportCategoryRuleEntity[];
};

export type EntityTableViewModel = {
    entities: SportCategoryRuleEntity[];
    editEntity$$: Subject<SportCategoryRuleEntity>;
    buttonPermissions: string[];
};

@Injectable()
export class SportCategoryRuleTableService extends ComponentStore<SportCategoryRuleTableState> {
    private activatedRoute = inject(ActivatedRoute);
    private sportCategoryRuleStoreService = inject(SportCategoryRuleStoreService);
    private router = inject(Router);
    
    private readonly handleEditEntity = this.effect(
        (editEntity$: Observable<SportCategoryRuleEntity>) => {
            return editEntity$.pipe(
                tap((entity) => this.editEntity(entity))
            );
        }
    );
    private readonly entities$ = this.select((state) => state.entities);
    private readonly selectEntities = this.effect(() => {
        return this.sportCategoryRuleStoreService.selectEntities$().pipe(
            tap((entities) => {
                this.updateEntitiesState(entities);
            })
        );
    });

    private editEntity$$: Subject<SportCategoryRuleEntity>;

    public readonly entityTableViewModel$: Observable<EntityTableViewModel> =
        this.select({
            entities: this.entities$,
        }).pipe(
            map((entityFormViewModel) => ({
                ...entityFormViewModel,
                buttonPermissions: [
                    RoleNames.ADMIN,
                    SportCategoryRulePermissionsService.updateSportCategoryRuleEntity,
                ],
                editEntity$$: this.editEntity$$,
            }))
        );

    public constructor(
    ) {
        super({
            entities: [],
        });

        this.editEntity$$ = new Subject();
    }

    public editEntity(entity: SportCategoryRuleEntity): void {
        this.router.navigate(['../edit', entity?.uid], {
            relativeTo: this.activatedRoute,
        });
    }

    public init$(): void {
        this.selectEntities();
        this.handleEditEntity(this.editEntity$$.asObservable());
    }

    private updateEntitiesState(entities: SportCategoryRuleEntity[]): void {
        this.setState((state) => {
            return {
                ...state,
                entities,
            };
        });
    }
}
