import { EntityFormUtil } from '../../core';
import { KeyValue } from '@angular/common';

export abstract class NetworkPlayerFormUtil extends EntityFormUtil {
  public abstract createPath(
    userId: string,
    sportNetworkId: string,
  ): KeyValue<string, string>[];
}
