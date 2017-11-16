import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuryMusicSharedModule } from '../../shared';
import { FuryMusicAdminModule } from '../../admin/admin.module';
import {
    PendingService,
    PendingPopupService,
    PendingComponent,
    PendingDetailComponent,
    PendingDialogComponent,
    PendingPopupComponent,
    PendingDeletePopupComponent,
    PendingDeleteDialogComponent,
    pendingRoute,
    pendingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...pendingRoute,
    ...pendingPopupRoute,
];

@NgModule({
    imports: [
        FuryMusicSharedModule,
        FuryMusicAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PendingComponent,
        PendingDetailComponent,
        PendingDialogComponent,
        PendingDeleteDialogComponent,
        PendingPopupComponent,
        PendingDeletePopupComponent,
    ],
    entryComponents: [
        PendingComponent,
        PendingDialogComponent,
        PendingPopupComponent,
        PendingDeleteDialogComponent,
        PendingDeletePopupComponent,
    ],
    providers: [
        PendingService,
        PendingPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuryMusicPendingModule {}
