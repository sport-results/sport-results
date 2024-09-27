import { Observable, Subject, tap } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
    SportEventEntity,
    SportEventEntityAdd,
    SportEventStoreService,
    SportEventFormUtil,
} from '@app/api/domain/sport-event';

import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';

export interface SportEventFormState {
    formGroup: FormGroup | undefined;
    entity: SportEventEntity | undefined;
    entityId: string | undefined;
}

export type EntityFormViewModel = {
    formGroup: FormGroup;
    cancel$$: Subject<void>;
    submit$$: Subject<void>;
};

@Injectable()
export class SportEventFormService extends ComponentStore<SportEventFormState> {
    private activatedRoute = inject(ActivatedRoute);
    private sportEventStoreService = inject(SportEventStoreService);
    private sportEventFormUtil = inject(SportEventFormUtil);
    private router = inject(Router);

    private readonly entity$ = this.select((state) => state.entity);
    readonly entityId$ = this.select((state) => state.entityId);
    private readonly formGroup$ = this.select((state) => state.formGroup);

    private readonly fetchEntity = this.effect(
        (entityId$: Observable<string | undefined>) => {
            return entityId$.pipe(
                switchMap((entityId) =>
                    this.sportEventStoreService.selectEntityById$(entityId || '').pipe(
                        tap((entity) => {
                            this.updateEntityState(entity);
                            this.updateFormGroupState(
                                this.sportEventFormUtil.createFormGroup(entity)
                            );
                        })
                    )
                )
            );
        }
    );
    
    private readonly getDataForSubmit$ = this.select((state) => ({
        entity: state.entity,
        formGroup: state.formGroup,
    }));

    private readonly handleCancel = this.effect((cancel$: Observable<void>) => {
        return cancel$.pipe(tap(() => this.cancel()));
    });
    private readonly handleSubmit = this.effect((submit$: Observable<void>) => {
        return submit$.pipe(
            switchMap(() =>
                this.getDataForSubmit$.pipe(
                    tap(({ entity, formGroup }) =>
                        this.submit(entity, formGroup as FormGroup)
                    )
                )
            )
        );
    });

    private cancel$$: Subject<void>;
    private submit$$: Subject<void>;

     public readonly entityFormViewModel$: Observable<EntityFormViewModel> =
        this.select({
            formGroup: this.formGroup$.pipe(
                map((formGroup) => formGroup as FormGroup)
            ),
        }).pipe(
            map((entityFormViewModel) =>
                this.extendsEntityFormViewModel(entityFormViewModel)
            )
        );

    public constructor() {
        super({
            formGroup: undefined,
            entity: undefined,
            entityId: undefined,
        });

        this.cancel$$ = new Subject();
        this.submit$$ = new Subject();
    }

    public cancel(): void {
        this.router.navigate(['../../list'], {
            relativeTo: this.activatedRoute,
        });
    }

    public init$(entityId: string | undefined): void {
        this.updateEntityIdState(entityId);
        this.fetchEntity(this.entityId$);
        this.handleCancel(this.cancel$$.asObservable());
        this.handleSubmit(this.submit$$.asObservable());
    }

     private addEntity(formGroup: FormGroup): void {
        this.sportEventStoreService.dispatchAddEntityAction(
            this.sportEventFormUtil.createEntity(formGroup) as SportEventEntityAdd
        );
    }

    private extendsEntityFormViewModel(
        entityFormViewModel: Partial<EntityFormViewModel>
    ):  EntityFormViewModel {
        return {
            formGroup: entityFormViewModel.formGroup as FormGroup,
            cancel$$: this.cancel$$,
            submit$$: this.submit$$,
        };
    }

    public submit(entity: SportEventEntity | undefined,
        formGroup: FormGroup): void {

        if (entity) {
            this.updateEntity(formGroup);
        } else {
            this.addEntity(formGroup);
        }

        this.router.navigate(['../../list'], {
            relativeTo: this.activatedRoute,
        });
    }

     private updateFormGroupState(formGroup: FormGroup): void {
        this.setState((state) => {
            return {
                ...state,
                formGroup,
            };
        });
    }

    private updateEntity(formGroup: FormGroup): void {
        this.sportEventStoreService.dispatchUpdateEntityAction(
            this.sportEventFormUtil.updateEntity(formGroup)
        );
    }

    private updateEntityState(entity: SportEventEntity | undefined): void {
        this.setState((state) => {
            return {
                ...state,
                entity,
            };
        });
    }

    private updateEntityIdState(entityId: string | undefined): void {
        this.setState((state) => {
            return {
                ...state,
                entityId,
            };
        });
    }
}
