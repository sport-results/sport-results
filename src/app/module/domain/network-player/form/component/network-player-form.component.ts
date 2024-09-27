import { Observable } from 'rxjs';

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';

import {
  NetworkPlayerFormService,
  NetworkPlayerFormViewModel,
} from './network-player-form.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NetworkPlayerFormService],
  selector: 'app-network-player-form',
  templateUrl: './network-player-form.component.html',
  styleUrls: ['./network-player-form.component.scss'],
})
export class NetworkPlayerFormComponent implements OnInit {
  public entityFormViewModel$!: Observable<NetworkPlayerFormViewModel>;

  private componentService = inject(NetworkPlayerFormService);
  private router = inject(Router);

  @Input()
  public entityId: string | undefined;
  @Input()
  public sportNetworkId: string | undefined;
  @Input()
  public userId: string | undefined;
  @Input()
  backUrl!: string;

  public ngOnInit(): void {
    const params = this.extractAllRouteParams(this.router);

    this.userId = params['userId'];
    this.sportNetworkId = params['sportNetworkId'];

    this.componentService.init$(
      this.entityId,
      this.sportNetworkId,
      this.userId,
      this.backUrl,
    );
    this.entityFormViewModel$ = this.componentService.entityFormViewModel$;
  }

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
