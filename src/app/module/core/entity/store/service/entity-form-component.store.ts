import { FormGroup } from '@angular/forms';
import {
  EntityComponentState,
  EntityComponentStore,
} from './entity-component.store';
import { Observable, Subject, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { inject } from '@angular/core';

export interface EntityFormComponentState<S> extends EntityComponentState<S> {
  formGroup: FormGroup | undefined;
}

export interface EntityFormViewModel {
  cancel$$: Subject<void>;
  formGroup: FormGroup;
  submit$$: Subject<void>;
}

export class EntityFormComponentStore<
  Z extends EntityFormComponentState<S>,
  R,
  S,
  T
> extends EntityComponentStore<Z, R, S, T> {
  protected activatedRoute = inject(ActivatedRoute);
  protected router = inject(Router);

  protected readonly formGroup$ = this.select((state) => state.formGroup);

  protected cancel$$ = new Subject<void>();
  protected submit$$ = new Subject<void>();

  protected override init(
    entityId: string | undefined,
    userId: string | undefined
  ): void {
    super.init(entityId, userId);

    this.handleCancel(this.cancel$$.asObservable());
  }

  protected cancel(): void {
    this.router.navigate(['../../../../'], {
      relativeTo: this.activatedRoute,
    });
  }

  protected readonly handleCancel = this.effect((cancel$: Observable<void>) => {
    return cancel$.pipe(tap(() => this.cancel()));
  });

  protected updateFormGroupState(formGroup: FormGroup): void {
    this.setState((state) => {
      return {
        ...state,
        formGroup,
      };
    });
  }
}
