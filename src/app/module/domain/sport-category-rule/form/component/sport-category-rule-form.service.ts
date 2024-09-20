import { Observable, Subject, tap } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ParticipantTypeEnum,
  participantTypes,
  PeriodTypeEnum,
  periodTypes,
  SportCategoryRuleEntity,
  SportCategoryRuleEntityAdd,
  SportCategoryRuleFormUtil,
  SportCategoryRuleStoreService,
} from '@app/api/domain/sport-category-rule';
import { ComponentStore } from '@ngrx/component-store';
import { SportCategory, SportCategoryEntity, SportCategoryStoreService } from '@app/api/domain/sport-category';

export interface SportCategoryRuleFormState {
  formGroup: FormGroup | undefined;
  entity: SportCategoryRuleEntity | undefined;
  entityId: string | undefined;
  parentEntityId: string | undefined;
  parentEntity: SportCategoryEntity | undefined;
}

export type EntityFormViewModel = {
  formGroup: FormGroup;
  cancel$$: Subject<void>;
  submit$$: Subject<void>;
  periodTypes: PeriodTypeEnum[];
  participantTypes: ParticipantTypeEnum[];
};

@Injectable()
export class SportCategoryRuleFormService extends ComponentStore<SportCategoryRuleFormState> {
  private activatedRoute = inject(ActivatedRoute);
  private sportCategoryRuleStoreService = inject(SportCategoryRuleStoreService);
  private sportCategoryRuleFormUtil = inject(SportCategoryRuleFormUtil);
  private sportCategoryStoreService = inject(SportCategoryStoreService);
  private router = inject(Router);

  private readonly entity$ = this.select((state) => state.entity);
  private readonly entityId$ = this.select((state) => state.entityId);
  private readonly parentEntity$ = this.select((state) => state.parentEntity);
  private readonly parentEntityId$ = this.select(
    (state) => state.parentEntityId
  );
  private readonly formGroup$ = this.select((state) => state.formGroup);
  private readonly getDataForSubmit$ = this.select((state) => ({
    entity: state.entity,
    parentEntity: state.parentEntity,
    formGroup: state.formGroup,
  }));

  private readonly fetchEntity = this.effect(
    (entityId$: Observable<string | undefined>) => {
      return entityId$.pipe(
        withLatestFrom(this.parentEntityId$),
        switchMap(([entityId, parentEntityId]) =>
          this.sportCategoryRuleStoreService
            .selectEntityById$(entityId || '')
            .pipe(
              tap((entity) => {
                this.updateEntityState(entity);
                this.updateFormGroupState(
                  this.sportCategoryRuleFormUtil.createFormGroup(entity)
                );
              })
            )
        )
      );
    }
  );

  private readonly fetchParentEntity = this.effect(
    (parentEntityId$: Observable<string | undefined>) => {
      return parentEntityId$.pipe(
        switchMap((parentEntityId) =>
          this.sportCategoryStoreService
            .selectEntityById$(parentEntityId || '')
            .pipe(
              tap((parentEntity) => {
                this.updateParentEntityState(parentEntity);
              })
            )
        )
      );
    }
  );

  private readonly handleCancel = this.effect((cancel$: Observable<void>) => {
    return cancel$.pipe(tap(() => this.cancel()));
  });
  private readonly handleSubmit = this.effect((submit$: Observable<void>) => {
    return submit$.pipe(
      switchMap(() =>
        this.getDataForSubmit$.pipe(
          tap(({ entity, parentEntity, formGroup }) =>
            this.submit(entity, parentEntity, formGroup as FormGroup)
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
      parentEntityId: undefined,
      parentEntity: undefined,
    });

    this.cancel$$ = new Subject();
    this.submit$$ = new Subject();
  }

  public cancel(): void {
    this.router.navigate(['../../../list'], {
      relativeTo: this.activatedRoute,
    });
  }

  public init$(
    entityId: string | undefined,
    parentEntityId: string | undefined
  ): void {
    this.updateEntityIdState(entityId);
    this.updateParentEntityIdState(parentEntityId);
    this.fetchEntity(this.entityId$);
    this.fetchParentEntity(this.parentEntityId$);
    this.handleCancel(this.cancel$$.asObservable());
    this.handleSubmit(this.submit$$.asObservable());
  }

  private addEntity(formGroup: FormGroup, parentEntity: SportCategoryEntity | undefined): void {
    if (!parentEntity) {
      throw new Error('No parent entity');
    }
    this.sportCategoryRuleStoreService.dispatchAddEntityToParentAction(
      this.sportCategoryRuleFormUtil.createEntity(
        formGroup
      ) as SportCategoryRuleEntityAdd,
      parentEntity.uid
    );
  }

  private extendsEntityFormViewModel(
    entityFormViewModel: Partial<EntityFormViewModel>
  ): EntityFormViewModel {
    return {
      formGroup: entityFormViewModel.formGroup as FormGroup,
      cancel$$: this.cancel$$,
      submit$$: this.submit$$,
      participantTypes,
      periodTypes,
    };
  }

  public submit(
    entity: SportCategoryRuleEntity | undefined,
    parentEntity: SportCategoryEntity | undefined,
    formGroup: FormGroup
  ): void {
    if (entity) {
      this.updateEntity(formGroup);
    } else {
      this.addEntity(formGroup, parentEntity);
    }

    this.router.navigate(['../../../list'], {
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
    this.sportCategoryRuleStoreService.dispatchUpdateEntityAction(
      this.sportCategoryRuleFormUtil.updateEntity(formGroup)
    );
  }

  private updateEntityState(entity: SportCategoryRuleEntity | undefined): void {
    this.setState((state) => {
      return {
        ...state,
        entity,
      };
    });
  }

  private updateParentEntityState(parentEntity: SportCategoryEntity | undefined): void {
    this.setState((state) => {
      return {
        ...state,
        parentEntity,
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

  private updateParentEntityIdState(parentEntityId: string | undefined): void {
    this.setState((state) => {
      return {
        ...state,
        parentEntityId,
      };
    });
  }
}
