import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarModule } from './module/app/top-bar';
import { CoreAuthorizationDataModule } from './module/core/authorization';
import { CoreApplicationModule } from './module/core/application';
import { CoreStoreModule } from './module/core/store';
import { NgxPermissionsModule } from 'ngx-permissions';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { UserModule } from '@app/domain/user';
import { RoleModule } from './module/domain/role';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

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
    RoleModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
