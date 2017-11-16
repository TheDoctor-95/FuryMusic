import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ArtistBandStatus } from './artist-band-status.model';
import { ArtistBandStatusPopupService } from './artist-band-status-popup.service';
import { ArtistBandStatusService } from './artist-band-status.service';

@Component({
    selector: 'jhi-artist-band-status-delete-dialog',
    templateUrl: './artist-band-status-delete-dialog.component.html'
})
export class ArtistBandStatusDeleteDialogComponent {

    artistBandStatus: ArtistBandStatus;

    constructor(
        private artistBandStatusService: ArtistBandStatusService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.artistBandStatusService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'artistBandStatusListModification',
                content: 'Deleted an artistBandStatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-artist-band-status-delete-popup',
    template: ''
})
export class ArtistBandStatusDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private artistBandStatusPopupService: ArtistBandStatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.artistBandStatusPopupService
                .open(ArtistBandStatusDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
