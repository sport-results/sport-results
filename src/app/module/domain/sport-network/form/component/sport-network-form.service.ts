import { Observable, tap } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  SportNetworkEntity,
  SportNetworkEntityAdd,
  SportNetworkStoreService,
  SportNetworkFormUtil,
  SportNetworkEntityUpdate,
} from '@app/api/domain/sport-network';

import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import {
  EntityFormComponentState,
  EntityFormComponentStore,
  EntityFormViewModel,
} from '@app/core/entity';

export interface SportNetworkFormState
  extends EntityFormComponentState<SportNetworkEntity> {}

export interface SportNetworkFormViewModel extends EntityFormViewModel {}

@Injectable()
export class SportNetworkFormService extends EntityFormComponentStore<
  SportNetworkFormState,
  SportNetworkEntityAdd,
  SportNetworkEntity,
  SportNetworkEntityUpdate
> {
  protected override entityStoreService = inject(SportNetworkStoreService);
  protected override entityFormUtil = inject(SportNetworkFormUtil);

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

    this.handleSubmit(this.submit$$.asObservable());
    this.createFormGroup(this.entity$);
  }

  private addEntity(formGroup: FormGroup): void {
    this.entityStoreService.dispatchAddEntityAction(
      this.entityFormUtil.createEntity(formGroup) as SportNetworkEntityAdd
    );
  }

  private readonly createFormGroup = this.effect(
    (entity$: Observable<SportNetworkEntity | undefined>) => {
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
    entity: SportNetworkEntity | undefined,
    formGroup: FormGroup,
    backUrl: string
  ): void {
    if (entity) {
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
