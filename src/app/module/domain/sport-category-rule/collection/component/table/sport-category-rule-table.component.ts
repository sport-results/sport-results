import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';

import { SportCategoryRuleTableService } from './sport-category-rule-table.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SportCategoryRuleTableService],
  selector: 'sr-sport-category-rule-table',
  templateUrl: './sport-category-rule-table.component.html',
  styleUrls: ['./sport-category-rule-table.component.scss'],
})
export class SportCategoryRuleTableComponent implements OnInit {
  private componentService = inject(SportCategoryRuleTableService);
  @Input()
  sportCategoryId!: string;

  public entityTableViewModel$$$ = toSignal(
    this.componentService.entityTableViewModel$
  );

  public ngOnInit(): void {
    this.componentService.init$(this.sportCategoryId);
  }
}
