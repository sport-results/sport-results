import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { SportCategoryExpandableTableService } from './sport-category-expandable-table.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SportCategoryExpandableTableService],
  selector: 'sr-sport-category-expandable-table',
  templateUrl: './sport-category-expandable-table.component.html',
  styleUrls: ['./sport-category-expandable-table.component.scss'],
})
export class SportCategoryExpandableTableComponent implements OnInit {
  private componentService = inject(SportCategoryExpandableTableService);

  public entityTableViewModel$$$ = toSignal(
    this.componentService.entityTableViewModel$
  );

  public ngOnInit(): void {
    this.componentService.init$();
  }
}
