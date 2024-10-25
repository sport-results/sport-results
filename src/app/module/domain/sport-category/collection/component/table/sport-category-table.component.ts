import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { SportCategoryTableService } from './sport-category-table.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SportCategoryTableService],
  selector: 'sr-sport-category-table',
  templateUrl: './sport-category-table.component.html',
  styleUrls: ['./sport-category-table.component.scss'],
})
export class SportCategoryTableComponent implements OnInit {
  private componentService = inject(SportCategoryTableService);

  public entityTableViewModel$$$ = toSignal(
    this.componentService.entityTableViewModel$
  );

  public ngOnInit(): void {
    this.componentService.init$();
  }
}
