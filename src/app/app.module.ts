import { NgxPermissionsModule } from 'ngx-permissions';
import { ToastModule } from 'primeng/toast';

import { NgModule } from '@angular/core';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {
  provideAppCheck,
  initializeAppCheck,
  ReCaptchaV3Provider,
} from '@angular/fire/app-check';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from '@app/domain/user';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarModule } from './module/app/top-bar';
import { CoreApplicationModule } from './module/core/application';
import { CoreAuthorizationDataModule } from './module/core/authorization';
import { CoreStoreModule } from './module/core/store';
import { RoleModule } from './module/domain/role';
import { SportCategoryModule } from './module/domain/sport-category';
import { SportCategoryRuleModule } from './module/domain/sport-category-rule';
import { MessageService } from 'primeng/api';
import { SportNetworkModule } from './module/domain/sport-network';
import { SportPlayerModule } from './module/domain/sport-player';
import { NetworkPlayerModule } from './module/domain/network-player';
import { SportEventModule } from './module/domain/sport-event';
import { PermissionModule } from './module/domain/permission';
import { SportResultModule } from './module/domain/sport-result';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TopBarModule,
    CoreAuthorizationDataModule,
    CoreApplicationModule,
    CoreStoreModule,
    NgxPermissionsModule.forRoot(),
    UserModule,
    RoleModule,
    SportCategoryModule,
    SportCategoryRuleModule,
    ToastModule,
    SportNetworkModule,
    SportPlayerModule,
    NetworkPlayerModule,
    SportEventModule,
    PermissionModule,
    SportResultModule,
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAppCheck(() => {
      const appCheckConfig = {
        provider: new ReCaptchaV3Provider(
          environment.appCheckKey
        ),
        isTokenAutoRefreshEnabled: true,
      };

      return initializeAppCheck(getApp(), appCheckConfig);
    }),
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
