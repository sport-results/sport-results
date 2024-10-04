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
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss'],
})
export class PermissionFormComponent
  extends EntityFormComponent<PermissionFormViewModel>
  implements OnInit
{
  public componentService = inject(PermissionFormService);

  public ngOnInit(): void {
    this.componentService.init$(this.entityId, this.userId, this.backUrl);
    this.entityFormViewModel$ = this.componentService.entityFormViewModel$;
  }
}
