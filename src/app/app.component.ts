import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SportCategoryStoreService } from './api/domain/sport-category';
import { SportCategoryRuleStoreService } from './api/domain/sport-category-rule';
import { onAuthStateChanged } from '@angular/fire/auth';
import { Auth } from '@firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private sportCategoryStoreService = inject(SportCategoryStoreService);
  private sportCategoryRuleStoreService = inject(SportCategoryRuleStoreService);

  private authChanged(auth: Auth) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

  title = 'sport-results';

  ngOnInit(): void {
    this.sportCategoryStoreService.dispatchListEntitiesAction();
    this.sportCategoryRuleStoreService.dispatchListGroupEntitiesAction();
  }
}
