import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuryMusicSharedModule } from '../../shared';
import { FuryMusicAdminModule } from '../../admin/admin.module';
import {
    HatredService,
    HatredPopupService,
    HatredComponent,
    HatredDetailComponent,
    HatredDialogComponent,
    HatredPopupComponent,
    HatredDeletePopupComponent,
    HatredDeleteDialogComponent,
    hatredRoute,
    hatredPopupRoute,
} from './';

const ENTITY_STATES = [
    ...hatredRoute,
    ...hatredPopupRoute,
];

@NgModule({
    imports: [
        FuryMusicSharedModule,
        FuryMusicAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        HatredComponent,
        HatredDetailComponent,
        HatredDialogComponent,
        HatredDeleteDialogComponent,
        HatredPopupComponent,
        HatredDeletePopupComponent,
    ],
    entryComponents: [
        HatredComponent,
        HatredDialogComponent,
        HatredPopupComponent,
        HatredDeleteDialogComponent,
        HatredDeletePopupComponent,
    ],
    providers: [
        HatredService,
        HatredPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuryMusicHatredModule {}
