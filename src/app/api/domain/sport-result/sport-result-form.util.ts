import { KeyValue } from '@angular/common';

import { EntityFormUtil } from '../../core';

export abstract class SportResultFormUtil extends EntityFormUtil {
    public abstract createPath(
    userId: string,
  ): KeyValue<string, string>[];
}
