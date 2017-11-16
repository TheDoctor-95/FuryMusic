import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuryMusicSharedModule } from '../../shared';
import { FuryMusicAdminModule } from '../../admin/admin.module';
import {
    FavouriteSongService,
    FavouriteSongPopupService,
    FavouriteSongComponent,
    FavouriteSongDetailComponent,
    FavouriteSongDialogComponent,
    FavouriteSongPopupComponent,
    FavouriteSongDeletePopupComponent,
    FavouriteSongDeleteDialogComponent,
    favouriteSongRoute,
    favouriteSongPopupRoute,
} from './';

const ENTITY_STATES = [
    ...favouriteSongRoute,
    ...favouriteSongPopupRoute,
];

@NgModule({
    imports: [
        FuryMusicSharedModule,
        FuryMusicAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FavouriteSongComponent,
        FavouriteSongDetailComponent,
        FavouriteSongDialogComponent,
        FavouriteSongDeleteDialogComponent,
        FavouriteSongPopupComponent,
        FavouriteSongDeletePopupComponent,
    ],
    entryComponents: [
        FavouriteSongComponent,
        FavouriteSongDialogComponent,
        FavouriteSongPopupComponent,
        FavouriteSongDeleteDialogComponent,
        FavouriteSongDeletePopupComponent,
    ],
    providers: [
        FavouriteSongService,
        FavouriteSongPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuryMusicFavouriteSongModule {}
