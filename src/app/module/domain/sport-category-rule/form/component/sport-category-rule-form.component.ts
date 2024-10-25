import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  runInInjectionContext,
} from '@angular/core';

import {
  SportCategoryRuleFormService,
  SportCategoryRuleFormViewModel,
} from './sport-category-rule-form.service';
import { EntityFormComponent } from '@app/core/entity';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SportCategoryRuleFormService],
  selector: 'sr-sport-category-rule-form',
  templateUrl: './sport-category-rule-form.component.html',
  styleUrls: ['./sport-category-rule-form.component.scss'],
})
export class SportCategoryRuleFormComponent
  extends EntityFormComponent<SportCategoryRuleFormViewModel>
  implements OnInit
{
  private componentService = inject(SportCategoryRuleFormService);

  @Input()
  public parentEntityId: string | undefined;

  public ngOnInit(): void {
    const params = this.extractAllRouteParams(this.router);

    this.userId = params['userId'];
    this.componentService.init$(
      this.entityId,
      this.userId,
      this.backUrl,
      this.parentEntityId
    );

    runInInjectionContext(this.injector, () => {
      this.entityFormViewModel$$$ = toSignal(this.componentService.entityFormViewModel$);
    });
  }
}
