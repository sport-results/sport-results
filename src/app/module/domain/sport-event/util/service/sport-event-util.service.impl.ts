import { ParticipantTypeEnum } from './../../../../../api/domain/sport-category-rule/sport-category-rule';
import { map, Observable, of, switchMap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  SportEventEntity,
  SportEventEntityAdd,
  SportEventEntitySimple,
  SportEventEntityUpdate,
  SportEventModel,
  SportEventModelAdd,
  SportEventModelSimple,
  SportEventModelUpdate,
} from '@app/api/domain/sport-event';
import { EntityUtilServiceImpl } from '@app/core/entity';
import {
  SportPlayerEntitySimple,
  SportPlayerModelSimple,
  SportPlayerUtilService,
} from '@app/api/domain/sport-player';

@Injectable()
export class SportEventUtilServiceImpl extends EntityUtilServiceImpl {
  private sportPlayerUtilService = inject(SportPlayerUtilService);

  public override createSimpleEntity(
    model: SportEventModelSimple
  ): SportEventEntitySimple {
    return {
      dateTime: new Date(model.dateTime),
      location: model.location,
      participants:
        model.sportCategoryRule.participantType === ParticipantTypeEnum.player
          ? model.participants.map(
              (participant) =>
                this.sportPlayerUtilService.createSimpleEntity(
                  participant
                ) as SportPlayerEntitySimple
            )
          : model.participants,
      sportCategory: model.sportCategory,
      sportCategoryRule: model.sportCategoryRule,
      uid: model.uid,
      sportNetworkId: model.sportNetworkId,
      userId: model.userId,
    };
  }
  public override createSimpleModel(
    entity: SportEventEntitySimple
  ): SportEventModelSimple {
    return {
      dateTime: entity.dateTime.toISOString(),
      location: entity.location,
      participants:
        entity.sportCategoryRule.participantType === ParticipantTypeEnum.player
          ? entity.participants.map(
              (participant) =>
                this.sportPlayerUtilService.createSimpleModel(
                  participant
                ) as SportPlayerModelSimple
            )
          : entity.participants,
      sportCategory: entity.sportCategory,
      sportCategoryRule: entity.sportCategoryRule,
      uid: entity.uid,
      sportNetworkId: entity.sportNetworkId,
      userId: entity.userId,
    };
  }
  public _sort = (a: SportEventEntity, b: SportEventEntity): number =>
    a.dateTime < b.dateTime ? 1 : -1;

  public constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  public override convertEntityAddToModelAdd(
    entity: SportEventEntityAdd
  ): SportEventModelAdd {
    return {
      dateTime: entity.dateTime.toISOString(),
      location: entity.location || null,
      meta: entity.meta,
      participants: entity.sportCategoryRule.participantType === ParticipantTypeEnum.player
      ? entity.participants.map(
          (participant) =>
            this.sportPlayerUtilService.createSimpleModel(
              participant
            ) as SportPlayerModelSimple
        )
      : entity.participants,
      sportCategoryRule: entity.sportCategoryRule,
      sportCategory: entity.sportCategory,
      sportNetworkId: entity.sportNetworkId,
      userId: entity.userId,
    };
  }

  public override convertEntityUpdateToModelUpdate(
    entity: SportEventEntityUpdate
  ): SportEventModelUpdate {
    const model: SportEventModelUpdate = {
      uid: entity.uid,
      meta: entity.meta,
    };

    if (entity.dateTime) {
      model.dateTime = entity.dateTime.toISOString();
    }

    if (entity.location) {
      model.location = entity.location || null;
    }

    if (entity.participants) {
      model.participants = entity.sportCategoryRule?.participantType === ParticipantTypeEnum.player
      ? entity.participants.map(
          (participant) =>
            this.sportPlayerUtilService.createSimpleModel(
              participant
            ) as SportPlayerModelSimple
        )
      : entity.participants;
    }

    if (entity.sportCategory) {
      model.sportCategory = entity.sportCategory;
    }

    if (entity.sportCategoryRule) {
      model.sportCategoryRule = entity.sportCategoryRule;
    }

    if (entity.sportNetworkId) {
      model.sportNetworkId = entity.sportNetworkId;
    }

    if (entity.userId) {
      model.userId = entity.userId;
    }

    return model;
  }

  public override convertModelToEntity$(
    model: SportEventModel
  ): Observable<SportEventEntity> {
    return of({
      meta: model.meta,
      dateTime: new Date(model.dateTime),
      location: model.location,
      participants:
        model.sportCategoryRule.participantType === ParticipantTypeEnum.player
          ? model.participants.map(
              (participant) =>
                this.sportPlayerUtilService.createSimpleEntity(
                  participant
                ) as SportPlayerEntitySimple
            )
          : model.participants,
      sportCategory: model.sportCategory,
      sportCategoryRule: model.sportCategoryRule,
      sportNetworkId: model.sportNetworkId,
      userId: model.userId,
      uid: model.uid,
    });
  }

  public override convertModelUpdateToEntityUpdate$(
    model: SportEventModelUpdate
  ): Observable<SportEventEntityUpdate> {
    return super.convertModelUpdateToEntityUpdate$(model).pipe(
      map((entity) => entity as SportEventEntityUpdate),
      switchMap((entity) => {
        if (model.location) {
          entity.location = model.location;
        }

        return of(entity);
      })
    );
  }
}
