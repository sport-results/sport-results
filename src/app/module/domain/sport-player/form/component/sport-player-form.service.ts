import { Observable, Subject, tap } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  SportPlayerEntity,
  SportPlayerEntityAdd,
  SportPlayerStoreService,
  SportPlayerFormUtil,
} from '@app/api/domain/sport-player';

import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { UserEntity, UserStoreService } from '@app/api/domain/user';
import {
  SportCategorySimple,
  SportCategoryStoreService,
} from '@app/api/domain/sport-category';

export interface SportPlayerFormState {
  formGroup: FormGroup | undefined;
  entity: SportPlayerEntity | undefined;
  entityId: string | undefined;
  users: UserEntity[];
  sportCategories: SportCategorySimple[];
}

export type EntityFormViewModel = {
  formGroup: FormGroup;
  cancel$$: Subject<void>;
  submit$$: Subject<void>;
  users: UserEntity[];
  sportCategories: SportCategorySimple[];
};

@Injectable()
export class SportPlayerFormService extends ComponentStore<SportPlayerFormState> {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly sportCategoryStoreService = inject(
    SportCategoryStoreService
  );
  private readonly sportPlayerStoreService = inject(SportPlayerStoreService);
  private readonly sportPlayerFormUtil = inject(SportPlayerFormUtil);
  private readonly router = inject(Router);
  private readonly userStoreService = inject(UserStoreService);

  private readonly entity$ = this.select((state) => state.entity);
  private readonly entityId$ = this.select((state) => state.entityId);
  private readonly formGroup$ = this.select((state) => state.formGroup);
  private readonly users$ = this.select((state) => state.users);
  private readonly sportCategories$ = this.select(
    (state) => state.sportCategories
  );

  private readonly fetchEntity = this.effect(
    (entityId$: Observable<string | undefined>) => {
      return entityId$.pipe(
        switchMap((entityId) =>
          this.sportPlayerStoreService.selectEntityById$(entityId || '').pipe(
            tap((entity) => {
              this.updateEntityState(entity);
              this.updateFormGroupState(
                this.sportPlayerFormUtil.createFormGroup(entity)
              );
            })
          )
        )
      );
    }
  );

  private readonly fetchUsers = this.effect(() => {
    return this.userStoreService.selectEntities$().pipe(
      tap((users) => {
        this.updateUsersState(users);
      })
    );
  });

  private readonly fetchSportCategories = this.effect(() => {
    return this.sportCategoryStoreService.selectEntities$().pipe(
      tap((sportCategories) => {
        this.updateSportCategoriesState(
          sportCategories.map((sportCategory) => ({
            uid: sportCategory.uid,
            name: sportCategory.name,
          }))
        );
      })
    );
  });

  private readonly getDataForSubmit$ = this.select({
    entity: this.entity$.pipe(map((entity) => entity)),
    formGroup: this.formGroup$.pipe(map((formGroup) => formGroup)),
    sportCategories: this.sportCategories$.pipe(
      map((sportCategories) => sportCategories)
    ),
  }).pipe(
    map((params) => ({
      ...this.extendsEntityFormViewModel(params),
      entity: params.entity,
    }))
  );

  private readonly handleCancel = this.effect((cancel$: Observable<void>) => {
    return cancel$.pipe(tap(() => this.cancel()));
  });
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

  private cancel$$: Subject<void>;
  private submit$$: Subject<void>;

  public readonly entityFormViewModel$: Observable<EntityFormViewModel> =
    this.select({
      formGroup: this.formGroup$.pipe(
        map((formGroup) => formGroup as FormGroup)
      ),
      users: this.users$.pipe(map((users) => users as UserEntity[])),
      sportCategories: this.sportCategories$.pipe(
        map((sportCategories) => sportCategories as SportCategorySimple[])
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
      users: [],
      sportCategories: [],
    });

    this.cancel$$ = new Subject();
    this.submit$$ = new Subject();
  }

  public cancel(): void {
    this.router.navigate(['../../list'], {
      relativeTo: this.activatedRoute,
    });
  }

  public init$(entityId: string | undefined): void {
    this.updateEntityIdState(entityId);
    
    this.fetchEntity(this.entityId$);
    this.fetchUsers();
    this.fetchSportCategories();

    this.handleCancel(this.cancel$$.asObservable());
    this.handleSubmit(this.submit$$.asObservable());
  }

  private addEntity(formGroup: FormGroup): void {
    this.sportPlayerStoreService.dispatchAddEntityAction(
      this.sportPlayerFormUtil.createEntity(formGroup) as SportPlayerEntityAdd
    );
  }

  private extendsEntityFormViewModel(
    entityFormViewModel: Partial<EntityFormViewModel>
  ): EntityFormViewModel {
    return {
      formGroup: entityFormViewModel.formGroup as FormGroup,
      cancel$$: this.cancel$$,
      submit$$: this.submit$$,
      users: entityFormViewModel.users as UserEntity[],
      sportCategories:
        entityFormViewModel.sportCategories as SportCategorySimple[],
    };
  }

  public submit(
    entity: SportPlayerEntity | undefined,
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

  private updateFormGroupState(formGroup: FormGroup): void {
    this.setState((state) => {
      return {
        ...state,
        formGroup,
      };
    });
  }

  private updateEntity(formGroup: FormGroup): void {
    this.sportPlayerStoreService.dispatchUpdateEntityAction(
      this.sportPlayerFormUtil.updateEntity(formGroup)
    );
  }

  private updateEntityState(entity: SportPlayerEntity | undefined): void {
    this.setState((state) => {
      return {
        ...state,
        entity,
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

  private updateUsersState(users: UserEntity[]): void {
    this.setState((state) => {
      return {
        ...state,
        users,
      };
    });
  }

  private updateSportCategoriesState(
    sportCategories: SportCategorySimple[]
  ): void {
    this.setState((state) => {
      return {
        ...state,
        sportCategories,
      };
    });
  }
}
