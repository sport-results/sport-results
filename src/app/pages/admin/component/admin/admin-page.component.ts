import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { AdminPageService, AdminPageViewModel } from './admin-page.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AdminPageService],
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  private componentService = inject(AdminPageService);

  public adminPageViewModel$!: Observable<AdminPageViewModel>;
  public items$!: Observable<MenuItem[]>;

  public ngOnInit(): void {
    this.componentService.init$();
    this.adminPageViewModel$ = this.componentService.adminPageViewModel$;
  }
}
