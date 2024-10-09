import { Observable, tap } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
    SportResultEntity,
    SportResultEntityAdd,
    SportResultEntityUpdate,
    SportResultStoreService,
    SportResultFormUtil,
} from '@app/api/domain/sport-result';

import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EntityFormComponentStore } from '@app/core/entity';
import { KeyValue } from '@angular/common';
import { UserEntity } from '@app/api/domain/user';

import { SportResultFormState, SportResultFormViewModel } from './sport-result-form.models';


@Injectable()
export class SportResultFormService extends EntityFormComponentStore<
    SportResultFormState,
    SportResultEntityAdd,
    SportResultEntity,
    SportResultEntityUpdate
    > {
    protected override entityStoreService = inject(SportResultStoreService);
    protected override entityFormUtil = inject(SportResultFormUtil);
    
    private readonly getDataForSubmit$ = this.select((state) => ({
        entity: state.entity,
        formGroup: state.formGroup,
        user: state.user,
    }));

    private readonly handleSubmit = this.effect((submit$: Observable<void>) => {
        return submit$.pipe(
            switchMap(() =>
                this.getDataForSubmit$.pipe(
                    withLatestFrom(this.backUrl$),
                    tap(([{ entity, formGroup, user }, backUrl]) =>
                        this.submit(entity, formGroup as FormGroup, backUrl, user as UserEntity)
                    )
                )
            )
        );
    });

    public readonly entityFormViewModel$: Observable<SportResultFormViewModel> =
        this.select({
            formGroup: this.formGroup$.pipe(
                map((formGroup) => formGroup as FormGroup)
            ),
            isNewEntity: this.isNewEntity$,
            isOwner: this.isOwner$,
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
            backUrl: '',
            user: undefined,
        });
    }

    public init$(entityId: string | undefined, userId: string | undefined, backUrl: string): void {
        super.initForm(entityId, userId, backUrl);
       
        this.handleSubmit(this.submit$$.asObservable());
        this.createFormGroup(this.entity$);
    }

    private addEntity(
        formGroup: FormGroup,
        subCollectionPath: string,
       
        path: KeyValue<string, string>[]
    ): void {
        this.entityStoreService.dispatchAddEntityAction(
            this.entityFormUtil.createEntity(
                formGroup, path
            ) as SportResultEntityAdd,
            subCollectionPath
        );
    }

    private readonly createFormGroup = this.effect(
    (entity$: Observable<SportResultEntity | undefined>) => {
      return entity$.pipe(
        tap((entity) =>
          this.updateFormGroupState(
            this.entityFormUtil.createFormGroup(
              entity,
            )
          )
        )
      );
    }
  );

    private extendsEntityFormViewModel(
        entityFormViewModel: Partial<SportResultFormViewModel>
    ):  SportResultFormViewModel {
        return {
            cancel$$: this.cancel$$,
            formGroup: entityFormViewModel.formGroup as FormGroup,
            isNewEntity: entityFormViewModel.isNewEntity as boolean,
            isOwner: entityFormViewModel.isOwner as boolean,
            submit$$: this.submit$$,
        };
    }

    public submit(
        entity: SportResultEntity | undefined,
        formGroup: FormGroup,
        backUrl: string,
        user: UserEntity,
    ): void {
        const subCollectionPath = '';

        if (entity) {
            this.updateEntity(formGroup, subCollectionPath);
        } else {
            this.addEntity(
                formGroup,
                subCollectionPath,
                this.entityFormUtil.createPath(user.uid)
            );
        }

        this.router.navigate([backUrl], {
            relativeTo: this.activatedRoute,
        });
    }

     protected override updateFormGroupState(formGroup: FormGroup): void {
        this.setState((state) => {
            return {
                ...state,
                formGroup,
            };
        });
    }

    private updateEntity(formGroup: FormGroup, subCollectionPath: string): void {
        this.entityStoreService.dispatchUpdateEntityAction(
            this.entityFormUtil.updateEntity(formGroup),
            subCollectionPath
        );
    }
}
