import { Observable, tap } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  SportCategoryEntity,
  SportCategoryEntityAdd,
  SportCategoryEntityUpdate,
  SportCategoryFormUtil,
  SportCategoryStoreService,
} from '@app/api/domain/sport-category';

import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  EntityFormComponentState,
  EntityFormComponentStore,
  EntityFormViewModel,
} from '@app/core/entity';

export interface SportCategoryFormState
  extends EntityFormComponentState<SportCategoryEntity> {}

export interface SportCategoryFormViewModel extends EntityFormViewModel {}

@Injectable()
export class SportCategoryFormService extends EntityFormComponentStore<
  SportCategoryFormState,
  SportCategoryEntityAdd,
  SportCategoryEntity,
  SportCategoryEntityUpdate
> {
  protected override entityStoreService = inject(SportCategoryStoreService);
  protected override entityFormUtil = inject(SportCategoryFormUtil);

  private readonly getDataForSubmit$ = this.select((state) => ({
    entity: state.entity,
    formGroup: state.formGroup,
  }));

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
      backUrl: '',
      user: undefined,
    });
  }

  public init$(
    entityId: string | undefined,
    userId: string | undefined,
    backUrl: string
  ): void {
    super.initForm(entityId, userId, backUrl);

    this.createFormGroup(this.entity$);
    this.handleSubmit(this.submit$$.asObservable());
  }

  private addEntity(formGroup: FormGroup): void {
    this.entityStoreService.dispatchAddEntityAction(
      this.entityFormUtil.createEntity(formGroup) as SportCategoryEntityAdd
    );
  }

  private readonly createFormGroup = this.effect(
    (entity$: Observable<SportCategoryEntity | undefined>) => {
      return entity$.pipe(
        tap((entity) =>
          this.updateFormGroupState(this.entityFormUtil.createFormGroup(entity))
        )
      );
    }
  );

  private extendsEntityFormViewModel(
    entityFormViewModel: Partial<EntityFormViewModel>
  ): EntityFormViewModel {
    return {
      formGroup: entityFormViewModel.formGroup as FormGroup,
      cancel$$: this.cancel$$,
      submit$$: this.submit$$,
    };
  }

  public submit(
    entity: SportCategoryEntity | undefined,
    formGroup: FormGroup
  ): void {
    if (entity) {
      this.updateEntity(formGroup);
    } else {
      this.addEntity(formGroup);
    }

    this.router.navigate(['../../list'], {
      relativeTo: this.activatedRoute,
    });
  }

  private updateEntity(formGroup: FormGroup): void {
    this.entityStoreService.dispatchUpdateEntityAction(
      this.entityFormUtil.updateEntity(formGroup)
    );
  }
}
