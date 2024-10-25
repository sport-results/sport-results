import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  runInInjectionContext,
} from '@angular/core';
import { EntityFormComponent } from '@app/core/entity';

import {
  PermissionFormService,
  PermissionFormViewModel,
} from './permission-form.service';
import { toSignal } from '@angular/core/rxjs-interop';

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
  private componentService = inject(PermissionFormService);

  public ngOnInit(): void {
    const params = this.extractAllRouteParams(this.router);

    this.userId = params['userId'];
    this.componentService.init$(this.entityId, this.userId, this.backUrl);

    runInInjectionContext(this.injector, () => {
      this.entityFormViewModel$$$ = toSignal(this.componentService.entityFormViewModel$);
    });
  }
}
