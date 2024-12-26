import { NgxPermissionsModule } from 'ngx-permissions';
import { ToastModule } from 'primeng/toast';

import {
  isDevMode,
  NgModule,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, onAuthStateChanged, provideAuth } from '@angular/fire/auth';
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
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      // console.log('auth', auth);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('User is logged in:', user);
        } else {
          console.log('No user is logged in');
        }
      });
      return auth;
    }),
    provideFirestore(() => getFirestore()),
    provideAppCheck(() => {
      const appCheckConfig = {
        provider: new ReCaptchaV3Provider(environment.appCheckKey),
        isTokenAutoRefreshEnabled: true,
      };

      return initializeAppCheck(getApp(), appCheckConfig);
    }),
    provideExperimentalZonelessChangeDetection(),
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
