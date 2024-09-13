import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ApplicationStoreService } from '@app/api/core/application';

@Directive({
  selector: '[mcIsAuthenticated]',
})
export class IsAuthenticatedDirective implements OnInit {
  public condition = false;

  constructor(
    private applicationStoreService: ApplicationStoreService,
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input()
  public set mcIsAuthenticated(condition: boolean) {
    this.condition = condition;
  }

  public ngOnInit() {
    this.applicationStoreService
      .selectIsAuthenticated$()
      .subscribe((isAuthenticated) => {
        if (
          (isAuthenticated && this.condition) ||
          (!isAuthenticated && !this.condition)
        ) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }
}
