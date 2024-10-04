import { SelectItemGroup } from 'primeng/api';
import { Observable, tap } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PermissionsService } from '@app/api/common';
import {
  RoleEntity,
  RoleEntityAdd,
  RoleEntityUpdate,
  RoleFormUtil,
  RoleStoreService,
  RoleUtilService,
} from '@app/api/domain/role';
import {
  EntityFormComponentState,
  EntityFormComponentStore,
  EntityFormViewModel,
} from '@app/core/entity';

export interface RoleFormState extends EntityFormComponentState<RoleEntity> {}

export interface RoleFormViewModel extends EntityFormViewModel {
  permissions: SelectItemGroup[];
}

@Injectable()
export class RoleFormService extends EntityFormComponentStore<
  RoleFormState,
  RoleEntityAdd,
  RoleEntity,
  RoleEntityUpdate
> {
  protected override entityStoreService = inject(RoleStoreService);
  protected override entityFormUtil = inject(RoleFormUtil);

  private readonly getDataForSubmit$ = this.select((state) => ({
    roleEntity: state.entity,
    formGroup: state.formGroup,
  }));

  private readonly createFormGroup = this.effect(
    (entity$: Observable<RoleEntity | undefined>) => {
      return entity$.pipe(
        tap((entity) =>
          this.updateFormGroupState(this.entityFormUtil.createFormGroup(entity))
        )
      );
    }
  );

  private readonly handleSubmit = this.effect((submit$: Observable<void>) => {
    return submit$.pipe(
      withLatestFrom(this.backUrl$),
      switchMap(([_, backUrl]) =>
        this.getDataForSubmit$.pipe(
          tap(({ roleEntity, formGroup }) =>
            this.submit(roleEntity, formGroup as FormGroup, backUrl)
          )
        )
      )
    );
  });

  public readonly entityFormViewModel$: Observable<RoleFormViewModel> =
    this.select({
      formGroup: this.formGroup$.pipe(
        map((formGroup) => formGroup as FormGroup)
      ),
    }).pipe(
      map((roleFormViewModel) =>
        this.extendsRoleFormViewModel(roleFormViewModel)
      )
    );

  public constructor() {
    super({
      backUrl: '',
      formGroup: undefined,
      entity: undefined,
      entityId: undefined,
      user: undefined,
    });
  }

  public init$(
    entityId: string | undefined,
    userId: string | undefined,
    backUrl: string
  ): void {
    super.initForm(entityId, userId, backUrl);

    this.handleSubmit(this.submit$$.asObservable());

    this.createFormGroup(this.entity$);
  }

  private addEntity(formGroup: FormGroup): void {
    this.entityStoreService.dispatchAddEntityAction(
      this.entityFormUtil.createEntity(formGroup) as RoleEntityAdd
    );
  }

  private extendsRoleFormViewModel(
    roleFormViewModel: Partial<RoleFormViewModel>
  ): RoleFormViewModel {
    return {
      formGroup: roleFormViewModel.formGroup as FormGroup,
      permissions: PermissionsService.permissions,
      cancel$$: this.cancel$$,
      submit$$: this.submit$$,
    };
  }

  private submit(
    roleEntity: RoleEntity | undefined,
    formGroup: FormGroup,
    backUrl: string
  ): void {
    if (roleEntity) {
      this.updateEntity(formGroup);
    } else {
      this.addEntity(formGroup);
    }

    this.router.navigate([backUrl], {
      relativeTo: this.activatedRoute,
    });
  }

  private updateEntity(formGroup: FormGroup): void {
    this.entityStoreService.dispatchUpdateEntityAction(
      this.entityFormUtil.updateEntity(formGroup)
    );
  }
}
