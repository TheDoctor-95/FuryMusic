import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuryMusicSharedModule } from '../../shared';
import { FuryMusicAdminModule } from '../../admin/admin.module';
import {
    RateAlbumService,
    RateAlbumPopupService,
    RateAlbumComponent,
    RateAlbumDetailComponent,
    RateAlbumDialogComponent,
    RateAlbumPopupComponent,
    RateAlbumDeletePopupComponent,
    RateAlbumDeleteDialogComponent,
    rateAlbumRoute,
    rateAlbumPopupRoute,
} from './';

const ENTITY_STATES = [
    ...rateAlbumRoute,
    ...rateAlbumPopupRoute,
];

@NgModule({
    imports: [
        FuryMusicSharedModule,
        FuryMusicAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RateAlbumComponent,
        RateAlbumDetailComponent,
        RateAlbumDialogComponent,
        RateAlbumDeleteDialogComponent,
        RateAlbumPopupComponent,
        RateAlbumDeletePopupComponent,
    ],
    entryComponents: [
        RateAlbumComponent,
        RateAlbumDialogComponent,
        RateAlbumPopupComponent,
        RateAlbumDeleteDialogComponent,
        RateAlbumDeletePopupComponent,
    ],
    providers: [
        RateAlbumService,
        RateAlbumPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuryMusicRateAlbumModule {}
