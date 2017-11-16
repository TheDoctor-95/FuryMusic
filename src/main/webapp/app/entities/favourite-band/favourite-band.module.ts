import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuryMusicSharedModule } from '../../shared';
import { FuryMusicAdminModule } from '../../admin/admin.module';
import {
    FavouriteBandService,
    FavouriteBandPopupService,
    FavouriteBandComponent,
    FavouriteBandDetailComponent,
    FavouriteBandDialogComponent,
    FavouriteBandPopupComponent,
    FavouriteBandDeletePopupComponent,
    FavouriteBandDeleteDialogComponent,
    favouriteBandRoute,
    favouriteBandPopupRoute,
} from './';

const ENTITY_STATES = [
    ...favouriteBandRoute,
    ...favouriteBandPopupRoute,
];

@NgModule({
    imports: [
        FuryMusicSharedModule,
        FuryMusicAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FavouriteBandComponent,
        FavouriteBandDetailComponent,
        FavouriteBandDialogComponent,
        FavouriteBandDeleteDialogComponent,
        FavouriteBandPopupComponent,
        FavouriteBandDeletePopupComponent,
    ],
    entryComponents: [
        FavouriteBandComponent,
        FavouriteBandDialogComponent,
        FavouriteBandPopupComponent,
        FavouriteBandDeleteDialogComponent,
        FavouriteBandDeletePopupComponent,
    ],
    providers: [
        FavouriteBandService,
        FavouriteBandPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuryMusicFavouriteBandModule {}
