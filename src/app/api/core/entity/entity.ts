import { Identifiable } from '../../common/identifiable';
import { Meta } from '../../common/meta';

export const enum EntityTypeEnum {
    Entity = 'entity',
    User = 'user',
}

export type EntityType = EntityTypeEnum.Entity;

export interface EntityHelper {
    meta: Meta;
}

export type Entity = EntityHelper & Identifiable;

export type EntityAdd = Omit<Entity, 'uid'>;

export type EntityUpdate = Partial<Entity> & Identifiable & EntityHelper;

export type EntityModel = Entity;

export type EntityModelAdd = Omit<EntityModel, 'uid'>;

export type EntityModelUpdate = Partial<EntityModel> & Identifiable & EntityHelper;
