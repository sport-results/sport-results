import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreApplicationStoreModule } from './store/core-application-store.module';
import { CoreApplicationViewModule } from './view/core-application-view.module';

@NgModule({
    exports: [CoreApplicationStoreModule, CoreApplicationViewModule],
    imports: [
        CommonModule,
        CoreApplicationStoreModule,
        CoreApplicationViewModule,
    ],
})
export class CoreApplicationModule {}
