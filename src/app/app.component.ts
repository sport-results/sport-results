import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SportCategoryStoreService } from './api/domain/sport-category';
import { SportCategoryRuleStoreService } from './api/domain/sport-category-rule';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private sportCategoryStoreService = inject(SportCategoryStoreService);
  private sportCategoryRuleStoreService = inject(SportCategoryRuleStoreService);

  title = 'sport-results';

  ngOnInit(): void {
    this.sportCategoryStoreService.dispatchListEntitiesAction();
    this.sportCategoryRuleStoreService.dispatchListGroupEntitiesAction();
  }
}
