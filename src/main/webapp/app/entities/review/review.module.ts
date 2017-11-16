import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuryMusicSharedModule } from '../../shared';
import {
    ReviewService,
    ReviewPopupService,
    ReviewComponent,
    ReviewDetailComponent,
    ReviewDialogComponent,
    ReviewPopupComponent,
    ReviewDeletePopupComponent,
    ReviewDeleteDialogComponent,
    reviewRoute,
    reviewPopupRoute,
} from './';

const ENTITY_STATES = [
    ...reviewRoute,
    ...reviewPopupRoute,
];

@NgModule({
    imports: [
        FuryMusicSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ReviewComponent,
        ReviewDetailComponent,
        ReviewDialogComponent,
        ReviewDeleteDialogComponent,
        ReviewPopupComponent,
        ReviewDeletePopupComponent,
    ],
    entryComponents: [
        ReviewComponent,
        ReviewDialogComponent,
        ReviewPopupComponent,
        ReviewDeleteDialogComponent,
        ReviewDeletePopupComponent,
    ],
    providers: [
        ReviewService,
        ReviewPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuryMusicReviewModule {}
