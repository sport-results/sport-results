import { Component, inject } from '@angular/core';
import { SportCategoryStoreService } from './api/domain/sport-category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private sportCategoryStoreService = inject(SportCategoryStoreService);
  title = 'sport-results';

  ngOnInit(): void {
    this.sportCategoryStoreService.dispatchListEntitiesAction();
  }
}
