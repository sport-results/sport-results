import { map, Observable, Subject, tap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleNamesEnum } from '@app/api/common';
import {
    SportCategoryEntity,
    SportCategoryPermissionsService,
    SportCategoryStoreService,
} from '@app/api/domain/sport-category';
import { ComponentStore } from '@ngrx/component-store';

export type SportCategoryTableState = {
    entities: SportCategoryEntity[];
};

export type EntityTableViewModel = {
    entities: SportCategoryEntity[];
    editEntity$$: Subject<SportCategoryEntity>;
    buttonPermissions: string[];
};

@Injectable()
export class SportCategoryTableService extends ComponentStore<SportCategoryTableState> {
    private activatedRoute = inject(ActivatedRoute);
    private sportCategoryStoreService =  inject(SportCategoryStoreService);
    private router = inject(Router);

     private readonly handleEditEntity = this.effect(
        (editEntity$: Observable<SportCategoryEntity>) => {
            return editEntity$.pipe(
                tap((entity) => this.editEntity(entity))
            );
        }
    );
    private readonly entities$ = this.select((state) => state.entities);
    private readonly selectEntities = this.effect(() => {
        return this.sportCategoryStoreService.selectEntities$().pipe(
            tap((entities) => {
                this.updateEntitiesState(entities);
            })
        );
    });

    private editEntity$$: Subject<SportCategoryEntity>;

    public readonly entityTableViewModel$: Observable<EntityTableViewModel> =
        this.select({
            entities: this.entities$,
        }).pipe(
            map((entityFormViewModel) => ({
                ...entityFormViewModel,
                buttonPermissions: [
                  RoleNamesEnum.ADMIN,
                    SportCategoryPermissionsService.updateSportCategoryEntity,
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

    public editEntity(entity: SportCategoryEntity): void {
        this.router.navigate(['../edit', entity?.uid], {
            relativeTo: this.activatedRoute,
        });
    }

    public init$(): void {
        this.selectEntities();
        this.handleEditEntity(this.editEntity$$.asObservable());
    }

    private updateEntitiesState(entities: SportCategoryEntity[]): void {
        this.setState((state) => {
            return {
                ...state,
                entities,
            };
        });
    }
}
