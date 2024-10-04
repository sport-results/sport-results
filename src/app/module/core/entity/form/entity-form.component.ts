import { Observable } from 'rxjs';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  template: '',
})
export class EntityFormComponent<T> {
  protected router = inject(Router);

  entityFormViewModel$!: Observable<T>;

  @Input()
  entityId: string | undefined;
  @Input()
  userId: string | undefined;
  @Input()
  backUrl!: string;

  extractAllRouteParams(router: Router): any {
    const params: any = {};

    let route: ActivatedRouteSnapshot | null = router.routerState.snapshot.root;

    do {
      Object.keys(route.params).forEach(
        (key) => (params[key] = route?.params[key])
      );
      route = route.firstChild;
    } while (route);
    return params;
  }
}
