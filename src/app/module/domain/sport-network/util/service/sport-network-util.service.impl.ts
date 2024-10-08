import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Entity,
  EntityAdd,
  EntityUpdate,
  SimpleEntity,
  SimpleModel,
} from '@app/api/core/entity';
import { SportCategoryEntitySimple } from '@app/api/domain/sport-category';
import {
  SPORT_NETWORK_FEATURE_KEY,
  SportNetworkEntity,
  SportNetworkEntityAdd,
  SportNetworkEntityUpdate,
  SportNetworkModelUpdate,
} from '@app/api/domain/sport-network';
import { USER_FEATURE_KEY, UserEntity } from '@app/api/domain/user';
import { EntityUtilServiceImpl } from '@app/core/entity';
import { map, Observable, of, switchMap } from 'rxjs';

@Injectable()
export class SportNetworkUtilServiceImpl extends EntityUtilServiceImpl {
  public _sort = (a: SportNetworkEntity, b: SportNetworkEntity): number =>
    a.name < b.name ? 1 : -1;

  public constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  public override convertModelUpdateToEntityUpdate$(
    model: SportNetworkModelUpdate
  ): Observable<SportNetworkEntityUpdate> {
    return super.convertModelUpdateToEntityUpdate$(model).pipe(
      map((entity) => entity as SportNetworkEntityUpdate),
      switchMap((entity) => {
        if (model.name) {
          entity.name = model.name;
        }

        return of(entity);
      })
    );
  }

  public createDefaultSportNetwork(
    sportCategories: SportCategoryEntitySimple[],
    user: UserEntity,
    path: KeyValue<string, string>[],
  ): SportNetworkEntityAdd {
    const now = new Date();
    return {
      meta: {
        creationDate: now.toISOString(),
        lastUpdated: now.toISOString(),
      },
      name: 'default',
      path,
      sportCategories,
      userId: user.uid,
    };
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

  public override createSimpleEntity(model: SimpleModel): SimpleEntity {
    throw new Error('Method not implemented.');
  }

  public override createSimpleModel(entity: SimpleEntity): SimpleModel {
    throw new Error('Method not implemented.');
  }

  public override updateEntity(formGroup: FormGroup): EntityUpdate {
    throw new Error('Method not implemented.');
  }

  public createPath(
    userId: string,
  ): KeyValue<string, string>[] {
    return [
      { key: USER_FEATURE_KEY, value: userId },
      { key: SPORT_NETWORK_FEATURE_KEY, value: '' },
    ];
  }
}
