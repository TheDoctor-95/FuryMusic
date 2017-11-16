import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuryMusicSharedModule } from '../../shared';
import { FuryMusicAdminModule } from '../../admin/admin.module';
import {
    FavouriteAlbumService,
    FavouriteAlbumPopupService,
    FavouriteAlbumComponent,
    FavouriteAlbumDetailComponent,
    FavouriteAlbumDialogComponent,
    FavouriteAlbumPopupComponent,
    FavouriteAlbumDeletePopupComponent,
    FavouriteAlbumDeleteDialogComponent,
    favouriteAlbumRoute,
    favouriteAlbumPopupRoute,
} from './';

const ENTITY_STATES = [
    ...favouriteAlbumRoute,
    ...favouriteAlbumPopupRoute,
];

@NgModule({
    imports: [
        FuryMusicSharedModule,
        FuryMusicAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FavouriteAlbumComponent,
        FavouriteAlbumDetailComponent,
        FavouriteAlbumDialogComponent,
        FavouriteAlbumDeleteDialogComponent,
        FavouriteAlbumPopupComponent,
        FavouriteAlbumDeletePopupComponent,
    ],
    entryComponents: [
        FavouriteAlbumComponent,
        FavouriteAlbumDialogComponent,
        FavouriteAlbumPopupComponent,
        FavouriteAlbumDeleteDialogComponent,
        FavouriteAlbumDeletePopupComponent,
    ],
    providers: [
        FavouriteAlbumService,
        FavouriteAlbumPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuryMusicFavouriteAlbumModule {}
