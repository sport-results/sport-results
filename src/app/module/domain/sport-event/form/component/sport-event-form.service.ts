import { Observable, Subject, tap } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  SportEventEntity,
  SportEventEntityAdd,
  SportEventStoreService,
  SportEventFormUtil,
  SportEventEntityUpdate,
} from '@app/api/domain/sport-event';

import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  EntityFormComponentState,
  EntityFormComponentStore,
  EntityFormViewModel,
} from '@app/core/entity';

export interface SportEventFormState
  extends EntityFormComponentState<SportEventEntity> {}

export interface SportEventFormViewModel extends EntityFormViewModel {
  submit$$: Subject<void>;
}
@Injectable()
export class SportEventFormService extends EntityFormComponentStore<
  SportEventFormState,
  SportEventEntityAdd,
  SportEventEntity,
  SportEventEntityUpdate
> {
  protected override entityStoreService = inject(SportEventStoreService);
  protected override entityFormUtil = inject(SportEventFormUtil);

  private readonly getDataForSubmit$ = this.select((state) => ({
    entity: state.entity,
    formGroup: state.formGroup,
  }));

  private readonly handleSubmit = this.effect((submit$: Observable<void>) => {
    return submit$.pipe(
      switchMap(() =>
        this.getDataForSubmit$.pipe(
          withLatestFrom(this.backUrl$),
          tap(([{ entity, formGroup }, backUrl]) =>
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

    this.cancel$$ = new Subject();
    this.submit$$ = new Subject();
  }

  public init$(entityId: string | undefined, backUrl: string): void {
    super.initForm(entityId, undefined, backUrl);

    this.fetchEntity(this.entityId$);
    this.handleSubmit(this.submit$$.asObservable());

    this.createFormGroup(this.entity$);
  }

  private addEntity(formGroup: FormGroup): void {
    this.entityStoreService.dispatchAddEntityAction(
      this.entityFormUtil.createEntity(formGroup) as SportEventEntityAdd
    );
  }

  private readonly createFormGroup = this.effect(
    (entity$: Observable<SportEventEntity | undefined>) => {
      return entity$.pipe(
        tap((entity) =>
          this.updateFormGroupState(
            this.entityFormUtil.createFormGroup(entity)
          )
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
    entity: SportEventEntity | undefined,
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

  protected override updateFormGroupState(formGroup: FormGroup): void {
    this.setState((state) => {
      return {
        ...state,
        formGroup,
      };
    });
  }

  private updateEntity(formGroup: FormGroup): void {
    this.entityStoreService.dispatchUpdateEntityAction(
      this.entityFormUtil.updateEntity(formGroup)
    );
  }
}
