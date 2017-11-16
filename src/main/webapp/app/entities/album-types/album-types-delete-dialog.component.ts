import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AlbumTypes } from './album-types.model';
import { AlbumTypesPopupService } from './album-types-popup.service';
import { AlbumTypesService } from './album-types.service';

@Component({
    selector: 'jhi-album-types-delete-dialog',
    templateUrl: './album-types-delete-dialog.component.html'
})
export class AlbumTypesDeleteDialogComponent {

    albumTypes: AlbumTypes;

    constructor(
        private albumTypesService: AlbumTypesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.albumTypesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'albumTypesListModification',
                content: 'Deleted an albumTypes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-album-types-delete-popup',
    template: ''
})
export class AlbumTypesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private albumTypesPopupService: AlbumTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.albumTypesPopupService
                .open(AlbumTypesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
