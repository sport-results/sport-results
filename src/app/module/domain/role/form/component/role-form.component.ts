import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  runInInjectionContext,
} from '@angular/core';

import { RoleFormService, RoleFormViewModel } from './role-form.service';
import { EntityFormComponent } from '@app/core/entity';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RoleFormService],
  selector: 'sr-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
})
export class RoleFormComponent
  extends EntityFormComponent<RoleFormViewModel>
  implements OnInit
{
  private componentService = inject(RoleFormService);

  public ngOnInit(): void {
    const params = this.extractAllRouteParams(this.router);

    this.userId = params['userId'];
    this.componentService.init$(this.entityId, this.userId, this.backUrl);

    runInInjectionContext(this.injector, () => {
      this.entityFormViewModel$$$ = toSignal(this.componentService.entityFormViewModel$);
    });
  }
}
