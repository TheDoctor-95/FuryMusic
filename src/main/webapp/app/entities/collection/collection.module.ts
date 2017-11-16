import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuryMusicSharedModule } from '../../shared';
import { FuryMusicAdminModule } from '../../admin/admin.module';
import {
    CollectionService,
    CollectionPopupService,
    CollectionComponent,
    CollectionDetailComponent,
    CollectionDialogComponent,
    CollectionPopupComponent,
    CollectionDeletePopupComponent,
    CollectionDeleteDialogComponent,
    collectionRoute,
    collectionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...collectionRoute,
    ...collectionPopupRoute,
];

@NgModule({
    imports: [
        FuryMusicSharedModule,
        FuryMusicAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CollectionComponent,
        CollectionDetailComponent,
        CollectionDialogComponent,
        CollectionDeleteDialogComponent,
        CollectionPopupComponent,
        CollectionDeletePopupComponent,
    ],
    entryComponents: [
        CollectionComponent,
        CollectionDialogComponent,
        CollectionPopupComponent,
        CollectionDeleteDialogComponent,
        CollectionDeletePopupComponent,
    ],
    providers: [
        CollectionService,
        CollectionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuryMusicCollectionModule {}
