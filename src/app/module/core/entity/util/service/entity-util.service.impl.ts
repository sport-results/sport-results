import { Observable, of } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Entity,
  EntityAdd,
  EntityModel,
  EntityModelAdd,
  EntityModelUpdate,
  EntityTypeEnum,
  EntityUpdate,
  EntityUtilService,
} from '@app/api/core/entity';
import {
  ParamItem,
  QueryConstraintTypeEnum,
  QueryOperatorEnum,
  SearchParam,
  SearchParams,
} from '@app/api/core/search';
import { ApplicationStoreService } from '@app/api/core/application';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export abstract class EntityUtilServiceImpl extends EntityUtilService<
  Entity,
  EntityAdd,
  EntityUpdate,
  EntityModel,
  EntityModelAdd,
  EntityModelUpdate
> {
  protected applicationStoreService = inject(ApplicationStoreService);

  protected _sortByMeta = (a: never, b: never): number => (a < b ? 1 : -1);

  public constructor(protected formBuilder: FormBuilder) {
    super();

    this.user$$$ = toSignal(this.applicationStoreService.selectAuthenticatedUser$());
  }

  public convertEntityAddToModelAdd(entity: EntityAdd): EntityModelAdd {
    return {
      ...entity,
    };
  }

  public convertEntityToModel(entity: Entity): EntityModel {
    return {
      ...entity,
    };
  }

  public convertEntityUpdateToModelUpdate(
    entity: EntityUpdate
  ): EntityModelUpdate {
    return {
      ...entity,
    };
  }

  public convertModelAddToEntityAdd(model: EntityModelAdd): EntityAdd {
    return {
      ...model,
    };
  }

  public convertModelToEntity$(model: EntityModel): Observable<Entity> {
    return of({
      ...model,
    });
  }

  public convertModelUpdateToEntityUpdate$(
    model: EntityModelUpdate
  ): Observable<EntityUpdate> {
    const entity: EntityUpdate = {
      uid: model.uid,
      meta: model.meta,
    };

    return of(entity);
  }

  public createSearchParameter(name: string): string[] {
    const searchOptions: string[] = [];
    let temp = '';

    for (let i = 0; i < name.length; i++) {
      temp = temp + name[i].toLowerCase();

      searchOptions.push(temp);
    }

    return searchOptions;
  }

  public createSearchParams(
    entityType: EntityTypeEnum,
    term: string
  ): SearchParams {
    const query: ParamItem<string> = {
      queryConstraint: QueryConstraintTypeEnum.where,
      operation: QueryOperatorEnum.arrayContains,
      field: 'searchParameters',
      value: term.toLowerCase(),
    };

    return [{ entityType, query }];
  }

  public createSearchParam(
    entityType: EntityTypeEnum,
    term: string,
    queryConstraint: QueryConstraintTypeEnum,
    operation: QueryOperatorEnum,
    field: string
  ): SearchParam {
    const query: ParamItem<string> = {
      queryConstraint,
      operation,
      field,
      value: term,
    };

    return { entityType, query };
  }

  public override createEntity(formGroup: FormGroup): EntityAdd {
    throw new Error('Method not implemented.');
  }
  public override createEntitySearchParameter(
    entity: Entity | EntityAdd | EntityUpdate
  ): string[] {
    throw new Error('Method not implemented.');
  }
  public override createFormGroup(entity: Entity | undefined): FormGroup {
    throw new Error('Method not implemented.');
  }
  public override updateEntity(formGroup: FormGroup): EntityUpdate {
    throw new Error('Method not implemented.');
  }
}
