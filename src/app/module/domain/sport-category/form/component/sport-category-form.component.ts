import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  runInInjectionContext,
} from '@angular/core';

import {
  SportCategoryFormService,
  SportCategoryFormViewModel,
} from './sport-category-form.service';
import { EntityFormComponent } from '@app/core/entity';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SportCategoryFormService],
  selector: 'sr-sport-category-form',
  templateUrl: './sport-category-form.component.html',
  styleUrls: ['./sport-category-form.component.scss'],
})
export class SportCategoryFormComponent
  extends EntityFormComponent<SportCategoryFormViewModel>
  implements OnInit
{
  private componentService = inject(SportCategoryFormService);

  public ngOnInit(): void {
    const params = this.extractAllRouteParams(this.router);

    this.userId = params['userId'];
    this.componentService.init$(this.entityId, this.userId, this.backUrl);

    runInInjectionContext(this.injector, () => {
      this.entityFormViewModel$$$ = toSignal(
        this.componentService.entityFormViewModel$
      );
    });
  }
}
