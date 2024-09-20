import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import {
  SportCategoryExpandableTableService,
  EntityTableViewModel,
} from './sport-category-expandable-table.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SportCategoryExpandableTableService],
  selector: 'sr-sport-category-expandable-table',
  templateUrl: './sport-category-expandable-table.component.html',
  styleUrls: ['./sport-category-expandable-table.component.scss'],
})
export class SportCategoryExpandableTableComponent implements OnInit {
  public entityTableViewModel$!: Observable<EntityTableViewModel>;

  public constructor(
    private componentService: SportCategoryExpandableTableService
  ) {}

  public ngOnInit(): void {
    this.componentService.init$();
    this.entityTableViewModel$ = this.componentService.entityTableViewModel$;
  }
}
