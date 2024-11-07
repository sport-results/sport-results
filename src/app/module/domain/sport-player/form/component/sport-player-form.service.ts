import { Observable, of, tap } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  SportPlayerEntity,
  SportPlayerEntityAdd,
  SportPlayerStoreService,
  SportPlayerFormUtil,
  SportPlayerEntityUpdate,
} from '@app/api/domain/sport-player';

import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserEntity } from '@app/api/domain/user';
import {
  SportCategoryEntitySimple,
  SportCategoryStoreService,
} from '@app/api/domain/sport-category';
import {
  EntityFormComponentState,
  EntityFormComponentStore,
  EntityFormViewModel,
} from '@app/core/entity';

export interface SportPlayerFormState
  extends EntityFormComponentState<SportPlayerEntity> {
  users: UserEntity[];
  sportCategories: SportCategoryEntitySimple[];
}

export interface SportPlayerFormViewModel extends EntityFormViewModel {
  users: UserEntity[];
  sportCategories: SportCategoryEntitySimple[];
}

@Injectable()
export class SportPlayerFormService extends EntityFormComponentStore<
  SportPlayerFormState,
  SportPlayerEntityAdd,
  SportPlayerEntity,
  SportPlayerEntityUpdate
> {
  protected sportCategoryStoreService = inject(SportCategoryStoreService);
  protected override entityStoreService = inject(SportPlayerStoreService);
  protected override entityFormUtil = inject(SportPlayerFormUtil);

  private readonly users$ = this.select((state) => state.users);
  private readonly sportCategories$ = this.select(
    (state) => state.sportCategories
  );

  private readonly fetchUsers = this.effect(() => {
    const users = this.userStoreService.selectEntities()();
    this.updateUsersState(users);

    return of(users);
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

  public readonly entityFormViewModel$: Observable<SportPlayerFormViewModel> =
    this.select({
      formGroup: this.formGroup$.pipe(
        map((formGroup) => formGroup as FormGroup)
      ),
      users: this.users$.pipe(map((users) => users as UserEntity[])),
      sportCategories: this.sportCategories$.pipe(
        map((sportCategories) => sportCategories as SportCategoryEntitySimple[])
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

    this.fetchUsers();
    this.fetchSportCategories();

    this.handleSubmit(this.submit$$.asObservable());

    this.createFormGroup(this.entity$);
  }

  private addEntity(formGroup: FormGroup): void {
    this.entityStoreService.dispatchAddEntityAction(
      this.entityFormUtil.createEntity(formGroup) as SportPlayerEntityAdd
    );
  }

  private readonly createFormGroup = this.effect(
    (entity$: Observable<SportPlayerEntity | undefined>) => {
      return entity$.pipe(
        tap((entity) =>
          this.updateFormGroupState(this.entityFormUtil.createFormGroup(entity))
        )
      );
    }
  );

  private extendsEntityFormViewModel(
    entityFormViewModel: Partial<SportPlayerFormViewModel>
  ): SportPlayerFormViewModel {
    return {
      formGroup: entityFormViewModel.formGroup as FormGroup,
      cancel$$: this.cancel$$,
      submit$$: this.submit$$,
      users: entityFormViewModel.users as UserEntity[],
      sportCategories:
        entityFormViewModel.sportCategories as SportCategoryEntitySimple[],
    };
  }

  public submit(
    entity: SportPlayerEntity | undefined,
    formGroup: FormGroup,
    backUrl: string,
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

  private updateUsersState(users: UserEntity[]): void {
    this.setState((state) => {
      return {
        ...state,
        users,
      };
    });
  }

  private updateSportCategoriesState(
    sportCategories: SportCategoryEntitySimple[]
  ): void {
    this.setState((state) => {
      return {
        ...state,
        sportCategories,
      };
    });
  }
}
