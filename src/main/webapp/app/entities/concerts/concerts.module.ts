import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuryMusicSharedModule } from '../../shared';
import {
    ConcertsService,
    ConcertsPopupService,
    ConcertsComponent,
    ConcertsDetailComponent,
    ConcertsDialogComponent,
    ConcertsPopupComponent,
    ConcertsDeletePopupComponent,
    ConcertsDeleteDialogComponent,
    concertsRoute,
    concertsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...concertsRoute,
    ...concertsPopupRoute,
];

@NgModule({
    imports: [
        FuryMusicSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ConcertsComponent,
        ConcertsDetailComponent,
        ConcertsDialogComponent,
        ConcertsDeleteDialogComponent,
        ConcertsPopupComponent,
        ConcertsDeletePopupComponent,
    ],
    entryComponents: [
        ConcertsComponent,
        ConcertsDialogComponent,
        ConcertsPopupComponent,
        ConcertsDeleteDialogComponent,
        ConcertsDeletePopupComponent,
    ],
    providers: [
        ConcertsService,
        ConcertsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuryMusicConcertsModule {}
