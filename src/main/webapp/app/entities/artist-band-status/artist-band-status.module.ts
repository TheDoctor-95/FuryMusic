import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuryMusicSharedModule } from '../../shared';
import {
    ArtistBandStatusService,
    ArtistBandStatusPopupService,
    ArtistBandStatusComponent,
    ArtistBandStatusDetailComponent,
    ArtistBandStatusDialogComponent,
    ArtistBandStatusPopupComponent,
    ArtistBandStatusDeletePopupComponent,
    ArtistBandStatusDeleteDialogComponent,
    artistBandStatusRoute,
    artistBandStatusPopupRoute,
} from './';

const ENTITY_STATES = [
    ...artistBandStatusRoute,
    ...artistBandStatusPopupRoute,
];

@NgModule({
    imports: [
        FuryMusicSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ArtistBandStatusComponent,
        ArtistBandStatusDetailComponent,
        ArtistBandStatusDialogComponent,
        ArtistBandStatusDeleteDialogComponent,
        ArtistBandStatusPopupComponent,
        ArtistBandStatusDeletePopupComponent,
    ],
    entryComponents: [
        ArtistBandStatusComponent,
        ArtistBandStatusDialogComponent,
        ArtistBandStatusPopupComponent,
        ArtistBandStatusDeleteDialogComponent,
        ArtistBandStatusDeletePopupComponent,
    ],
    providers: [
        ArtistBandStatusService,
        ArtistBandStatusPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuryMusicArtistBandStatusModule {}
