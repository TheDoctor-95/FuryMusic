import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuryMusicSharedModule } from '../../shared';
import { FuryMusicAdminModule } from '../../admin/admin.module';
import {
    UserExtService,
    UserExtPopupService,
    UserExtComponent,
    UserExtDetailComponent,
    UserExtDialogComponent,
    UserExtPopupComponent,
    UserExtDeletePopupComponent,
    UserExtDeleteDialogComponent,
    userExtRoute,
    userExtPopupRoute,
} from './';

const ENTITY_STATES = [
    ...userExtRoute,
    ...userExtPopupRoute,
];

@NgModule({
    imports: [
        FuryMusicSharedModule,
        FuryMusicAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UserExtComponent,
        UserExtDetailComponent,
        UserExtDialogComponent,
        UserExtDeleteDialogComponent,
        UserExtPopupComponent,
        UserExtDeletePopupComponent,
    ],
    entryComponents: [
        UserExtComponent,
        UserExtDialogComponent,
        UserExtPopupComponent,
        UserExtDeleteDialogComponent,
        UserExtDeletePopupComponent,
    ],
    providers: [
        UserExtService,
        UserExtPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuryMusicUserExtModule {}
