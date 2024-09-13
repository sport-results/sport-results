import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthorizationService } from '@app/api/core/authorization';

import { AuthorizationServiceImpl } from './service';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: AuthorizationService,
      useClass: AuthorizationServiceImpl,
    },
  ],
})
export class CoreAuthorizationDataModule {}
