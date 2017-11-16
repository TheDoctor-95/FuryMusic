import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RateAlbum } from './rate-album.model';
import { RateAlbumPopupService } from './rate-album-popup.service';
import { RateAlbumService } from './rate-album.service';

@Component({
    selector: 'jhi-rate-album-delete-dialog',
    templateUrl: './rate-album-delete-dialog.component.html'
})
export class RateAlbumDeleteDialogComponent {

    rateAlbum: RateAlbum;

    constructor(
        private rateAlbumService: RateAlbumService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rateAlbumService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rateAlbumListModification',
                content: 'Deleted an rateAlbum'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rate-album-delete-popup',
    template: ''
})
export class RateAlbumDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rateAlbumPopupService: RateAlbumPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rateAlbumPopupService
                .open(RateAlbumDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
