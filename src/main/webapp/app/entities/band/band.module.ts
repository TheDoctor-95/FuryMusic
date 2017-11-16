import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuryMusicSharedModule } from '../../shared';
import {
    BandService,
    BandPopupService,
    BandComponent,
    BandDetailComponent,
    BandDialogComponent,
    BandPopupComponent,
    BandDeletePopupComponent,
    BandDeleteDialogComponent,
    bandRoute,
    bandPopupRoute,
} from './';

const ENTITY_STATES = [
    ...bandRoute,
    ...bandPopupRoute,
];

@NgModule({
    imports: [
        FuryMusicSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BandComponent,
        BandDetailComponent,
        BandDialogComponent,
        BandDeleteDialogComponent,
        BandPopupComponent,
        BandDeletePopupComponent,
    ],
    entryComponents: [
        BandComponent,
        BandDialogComponent,
        BandPopupComponent,
        BandDeleteDialogComponent,
        BandDeletePopupComponent,
    ],
    providers: [
        BandService,
        BandPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuryMusicBandModule {}
