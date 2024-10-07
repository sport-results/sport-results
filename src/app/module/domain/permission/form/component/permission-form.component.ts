import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { EntityFormComponent } from '@app/core/entity';

import {
  PermissionFormService,
  PermissionFormViewModel,
} from './permission-form.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PermissionFormService],
  selector: 'sr-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss'],
})
export class PermissionFormComponent
  extends EntityFormComponent<PermissionFormViewModel>
  implements OnInit
{
  public componentService = inject(PermissionFormService);

  public ngOnInit(): void {
    const params = this.extractAllRouteParams(this.router);

    this.userId = params['userId'];
    this.componentService.init$(this.entityId, this.userId, this.backUrl);
    this.entityFormViewModel$ = this.componentService.entityFormViewModel$;
  }
}
