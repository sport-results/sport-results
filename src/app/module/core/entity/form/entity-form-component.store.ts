import { FormGroup } from '@angular/forms';

import { Observable, Subject, tap, withLatestFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Entity, EntityFormUtil } from '@app/api/core/entity';
import { EntityComponentState, EntityComponentStore } from '../store';
import { KeyValue } from '@angular/common';

export interface EntityFormComponentState<S> extends EntityComponentState<S> {
  backUrl: string;
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
  protected entityFormUtil!: EntityFormUtil;
  protected activatedRoute = inject(ActivatedRoute);
  protected router = inject(Router);

  protected readonly backUrl$ = this.select((state) => state.backUrl);
  protected readonly formGroup$ = this.select((state) => state.formGroup);
  protected readonly isNewEntity$ = this.select((state) => !state.entity);
  protected readonly isOwner$ = this.select(
    (state) => (state.entity as Entity).meta.ownerId === state.user?.uid
  );

  protected cancel$$ = new Subject<void>();
  protected submit$$ = new Subject<void>();

  protected initForm(
    entityId: string | undefined,
    userId: string | undefined,
    backUrl: string
  ): void {
    super.init(entityId, userId);

    this.updateBackUrlState(backUrl);
    this.handleCancel(this.cancel$$.asObservable());
  }

  public cancel(backUrl: string): void {
    this.router.navigate([backUrl], {
      relativeTo: this.activatedRoute,
    });
  }

  private readonly handleCancel = this.effect((cancel$: Observable<void>) => {
    return cancel$.pipe(
      withLatestFrom(this.backUrl$),
      tap(([_, backUrl]) => this.cancel(backUrl))
    );
  });

  protected updateBackUrlState(backUrl: string): void {
    this.setState((state) => {
      return {
        ...state,
        backUrl,
      };
    });
  }

  protected updateFormGroupState(formGroup: FormGroup): void {
    this.setState((state) => {
      return {
        ...state,
        formGroup,
      };
    });
  }

  protected createSubCollectionPath(
    path: KeyValue<string, string>[],
    entityId?: string
  ): string {
    if (entityId) {
      return `${path
        .map((item) => `${item.key}/${item.value}`)
        .join('/')}${entityId}`;
    } else {
      return `${[...path]
        .slice(0, path.length - 1)
        .map((item) => `${item.key}/${item.value}`)
        .join('/')}`;
    }
  }
}
