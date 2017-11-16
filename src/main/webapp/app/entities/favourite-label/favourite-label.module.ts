import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuryMusicSharedModule } from '../../shared';
import { FuryMusicAdminModule } from '../../admin/admin.module';
import {
    FavouriteLabelService,
    FavouriteLabelPopupService,
    FavouriteLabelComponent,
    FavouriteLabelDetailComponent,
    FavouriteLabelDialogComponent,
    FavouriteLabelPopupComponent,
    FavouriteLabelDeletePopupComponent,
    FavouriteLabelDeleteDialogComponent,
    favouriteLabelRoute,
    favouriteLabelPopupRoute,
} from './';

const ENTITY_STATES = [
    ...favouriteLabelRoute,
    ...favouriteLabelPopupRoute,
];

@NgModule({
    imports: [
        FuryMusicSharedModule,
        FuryMusicAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FavouriteLabelComponent,
        FavouriteLabelDetailComponent,
        FavouriteLabelDialogComponent,
        FavouriteLabelDeleteDialogComponent,
        FavouriteLabelPopupComponent,
        FavouriteLabelDeletePopupComponent,
    ],
    entryComponents: [
        FavouriteLabelComponent,
        FavouriteLabelDialogComponent,
        FavouriteLabelPopupComponent,
        FavouriteLabelDeleteDialogComponent,
        FavouriteLabelDeletePopupComponent,
    ],
    providers: [
        FavouriteLabelService,
        FavouriteLabelPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuryMusicFavouriteLabelModule {}
