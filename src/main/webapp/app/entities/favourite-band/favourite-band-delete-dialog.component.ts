import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FavouriteBand } from './favourite-band.model';
import { FavouriteBandPopupService } from './favourite-band-popup.service';
import { FavouriteBandService } from './favourite-band.service';

@Component({
    selector: 'jhi-favourite-band-delete-dialog',
    templateUrl: './favourite-band-delete-dialog.component.html'
})
export class FavouriteBandDeleteDialogComponent {

    favouriteBand: FavouriteBand;

    constructor(
        private favouriteBandService: FavouriteBandService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.favouriteBandService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'favouriteBandListModification',
                content: 'Deleted an favouriteBand'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-favourite-band-delete-popup',
    template: ''
})
export class FavouriteBandDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private favouriteBandPopupService: FavouriteBandPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.favouriteBandPopupService
                .open(FavouriteBandDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
