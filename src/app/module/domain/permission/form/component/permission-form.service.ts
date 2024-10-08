import { selectableActions } from '@app/api/common';
import { Observable, Subject, tap } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  PermissionEntity,
  PermissionEntityAdd,
  PermissionStoreService,
  PermissionFormUtil,
  PermissionEntityUpdate,
} from '@app/api/domain/permission';

import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  EntityFormComponentState,
  EntityFormComponentStore,
  EntityFormViewModel,
} from '@app/core/entity';
import { ActionEnum } from '@app/api/common';

export interface PermissionFormState
  extends EntityFormComponentState<PermissionEntity> {
  formGroup: FormGroup | undefined;
  entity: PermissionEntity | undefined;
  entityId: string | undefined;
}

export interface PermissionFormViewModel extends EntityFormViewModel {
  formGroup: FormGroup;
  cancel$$: Subject<void>;
  selectableActions: ActionEnum[];
  submit$$: Subject<void>;
}

@Injectable()
export class PermissionFormService extends EntityFormComponentStore<
  PermissionFormState,
  PermissionEntityAdd,
  PermissionEntity,
  PermissionEntityUpdate
> {
  protected override entityStoreService = inject(PermissionStoreService);
  protected override entityFormUtil = inject(PermissionFormUtil);

  private readonly getDataForSubmit$ = this.select((state) => ({
    entity: state.entity,
    formGroup: state.formGroup,
  }));

  private readonly handleSubmit = this.effect((submit$: Observable<void>) => {
    return submit$.pipe(
      withLatestFrom(this.backUrl$),
      switchMap(([_, backUrl]) =>
        this.getDataForSubmit$.pipe(
          tap(({ entity, formGroup }) =>
            this.submit(entity, formGroup as FormGroup, backUrl)
          )
        )
      )
    );
  });

  public readonly entityFormViewModel$: Observable<PermissionFormViewModel> =
    this.select({
      formGroup: this.formGroup$.pipe(
        filter((formGroup) => !!formGroup),
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
    this.entity$.subscribe(console.log);
    super.initForm(entityId, userId, backUrl);

    this.handleSubmit(this.submit$$.asObservable());
    this.createFormGroup(this.entity$);
  }

  private addEntity(formGroup: FormGroup): void {
    this.entityStoreService.dispatchAddEntityAction(
      this.entityFormUtil.createEntity(formGroup) as PermissionEntityAdd
    );
  }

  private readonly createFormGroup = this.effect(
    (entity$: Observable<PermissionEntity | undefined>) => {
      return entity$.pipe(
        tap((entity) =>
          this.updateFormGroupState(this.entityFormUtil.createFormGroup(entity))
        )
      );
    }
  );

  private extendsEntityFormViewModel(
    entityFormViewModel: Partial<PermissionFormViewModel>
  ): PermissionFormViewModel {
    return {
      cancel$$: this.cancel$$,
      formGroup: entityFormViewModel.formGroup as FormGroup,
      selectableActions,
      submit$$: this.submit$$,
    };
  }

  public submit(
    entity: PermissionEntity | undefined,
    formGroup: FormGroup,
    backUrl: string
  ): void {
    if (entity) {
      this.updateEntity(
        formGroup,
        this.createSubCollectionPath(entity.path)
      );
    } else {
      this.addEntity(formGroup);
    }

    this.router.navigate([backUrl], {
      relativeTo: this.activatedRoute,
    });
  }

  private updateEntity(formGroup: FormGroup, subCollectionPath: string): void {
    this.entityStoreService.dispatchUpdateEntityAction(
      this.entityFormUtil.updateEntity(formGroup),
      subCollectionPath
    );
  }
}
