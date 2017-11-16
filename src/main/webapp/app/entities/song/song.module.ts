import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuryMusicSharedModule } from '../../shared';
import {
    SongService,
    SongPopupService,
    SongComponent,
    SongDetailComponent,
    SongDialogComponent,
    SongPopupComponent,
    SongDeletePopupComponent,
    SongDeleteDialogComponent,
    songRoute,
    songPopupRoute,
} from './';

const ENTITY_STATES = [
    ...songRoute,
    ...songPopupRoute,
];

@NgModule({
    imports: [
        FuryMusicSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SongComponent,
        SongDetailComponent,
        SongDialogComponent,
        SongDeleteDialogComponent,
        SongPopupComponent,
        SongDeletePopupComponent,
    ],
    entryComponents: [
        SongComponent,
        SongDialogComponent,
        SongPopupComponent,
        SongDeleteDialogComponent,
        SongDeletePopupComponent,
    ],
    providers: [
        SongService,
        SongPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuryMusicSongModule {}
