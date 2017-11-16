import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuryMusicSharedModule } from '../../shared';
import { FuryMusicAdminModule } from '../../admin/admin.module';
import {
    FavouriteArtistService,
    FavouriteArtistPopupService,
    FavouriteArtistComponent,
    FavouriteArtistDetailComponent,
    FavouriteArtistDialogComponent,
    FavouriteArtistPopupComponent,
    FavouriteArtistDeletePopupComponent,
    FavouriteArtistDeleteDialogComponent,
    favouriteArtistRoute,
    favouriteArtistPopupRoute,
} from './';

const ENTITY_STATES = [
    ...favouriteArtistRoute,
    ...favouriteArtistPopupRoute,
];

@NgModule({
    imports: [
        FuryMusicSharedModule,
        FuryMusicAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FavouriteArtistComponent,
        FavouriteArtistDetailComponent,
        FavouriteArtistDialogComponent,
        FavouriteArtistDeleteDialogComponent,
        FavouriteArtistPopupComponent,
        FavouriteArtistDeletePopupComponent,
    ],
    entryComponents: [
        FavouriteArtistComponent,
        FavouriteArtistDialogComponent,
        FavouriteArtistPopupComponent,
        FavouriteArtistDeleteDialogComponent,
        FavouriteArtistDeletePopupComponent,
    ],
    providers: [
        FavouriteArtistService,
        FavouriteArtistPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuryMusicFavouriteArtistModule {}
