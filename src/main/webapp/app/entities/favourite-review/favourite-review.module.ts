import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuryMusicSharedModule } from '../../shared';
import { FuryMusicAdminModule } from '../../admin/admin.module';
import {
    FavouriteReviewService,
    FavouriteReviewPopupService,
    FavouriteReviewComponent,
    FavouriteReviewDetailComponent,
    FavouriteReviewDialogComponent,
    FavouriteReviewPopupComponent,
    FavouriteReviewDeletePopupComponent,
    FavouriteReviewDeleteDialogComponent,
    favouriteReviewRoute,
    favouriteReviewPopupRoute,
} from './';

const ENTITY_STATES = [
    ...favouriteReviewRoute,
    ...favouriteReviewPopupRoute,
];

@NgModule({
    imports: [
        FuryMusicSharedModule,
        FuryMusicAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FavouriteReviewComponent,
        FavouriteReviewDetailComponent,
        FavouriteReviewDialogComponent,
        FavouriteReviewDeleteDialogComponent,
        FavouriteReviewPopupComponent,
        FavouriteReviewDeletePopupComponent,
    ],
    entryComponents: [
        FavouriteReviewComponent,
        FavouriteReviewDialogComponent,
        FavouriteReviewPopupComponent,
        FavouriteReviewDeleteDialogComponent,
        FavouriteReviewDeletePopupComponent,
    ],
    providers: [
        FavouriteReviewService,
        FavouriteReviewPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuryMusicFavouriteReviewModule {}
