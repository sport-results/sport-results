import { DataService } from '../../common/data';
import {
    EntityModel,
    EntityModelAdd,
    EntityModelUpdate,
} from '../../core/entity';

export abstract class DataEngine extends DataService<
    EntityModel,
    EntityModelAdd,
    EntityModelUpdate
> {}
