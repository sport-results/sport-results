import { Observable, Subject, tap } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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

export interface PermissionFormState
  extends EntityFormComponentState<PermissionEntity> {
  formGroup: FormGroup | undefined;
  entity: PermissionEntity | undefined;
  entityId: string | undefined;
}

export interface PermissionFormViewModel extends EntityFormViewModel {
  formGroup: FormGroup;
  cancel$$: Subject<void>;
  submit$$: Subject<void>;
}

@Injectable()
export class PermissionFormService extends EntityFormComponentStore<
  PermissionFormState,
  PermissionEntityAdd,
  PermissionEntity,
  PermissionEntityUpdate
> {
  private permissionStoreService = inject(PermissionStoreService);
  private permissionFormUtil = inject(PermissionFormUtil);

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

  public init$(entityId: string | undefined, userId: string | undefined,
    backUrl: string): void {
    super.initForm(entityId, userId, backUrl);
    this.handleSubmit(this.submit$$.asObservable());
  }

  private addEntity(formGroup: FormGroup): void {
    this.permissionStoreService.dispatchAddEntityAction(
      this.permissionFormUtil.createEntity(formGroup) as PermissionEntityAdd
    );
  }

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
    entity: PermissionEntity | undefined,
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
    this.permissionStoreService.dispatchUpdateEntityAction(
      this.permissionFormUtil.updateEntity(formGroup)
    );
  }
}
