import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuryMusicSharedModule } from '../../shared';
import {
    AlbumTypesService,
    AlbumTypesPopupService,
    AlbumTypesComponent,
    AlbumTypesDetailComponent,
    AlbumTypesDialogComponent,
    AlbumTypesPopupComponent,
    AlbumTypesDeletePopupComponent,
    AlbumTypesDeleteDialogComponent,
    albumTypesRoute,
    albumTypesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...albumTypesRoute,
    ...albumTypesPopupRoute,
];

@NgModule({
    imports: [
        FuryMusicSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AlbumTypesComponent,
        AlbumTypesDetailComponent,
        AlbumTypesDialogComponent,
        AlbumTypesDeleteDialogComponent,
        AlbumTypesPopupComponent,
        AlbumTypesDeletePopupComponent,
    ],
    entryComponents: [
        AlbumTypesComponent,
        AlbumTypesDialogComponent,
        AlbumTypesPopupComponent,
        AlbumTypesDeleteDialogComponent,
        AlbumTypesDeletePopupComponent,
    ],
    providers: [
        AlbumTypesService,
        AlbumTypesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuryMusicAlbumTypesModule {}
