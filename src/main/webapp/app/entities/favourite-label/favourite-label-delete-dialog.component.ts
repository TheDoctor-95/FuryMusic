import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FavouriteLabel } from './favourite-label.model';
import { FavouriteLabelPopupService } from './favourite-label-popup.service';
import { FavouriteLabelService } from './favourite-label.service';

@Component({
    selector: 'jhi-favourite-label-delete-dialog',
    templateUrl: './favourite-label-delete-dialog.component.html'
})
export class FavouriteLabelDeleteDialogComponent {

    favouriteLabel: FavouriteLabel;

    constructor(
        private favouriteLabelService: FavouriteLabelService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.favouriteLabelService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'favouriteLabelListModification',
                content: 'Deleted an favouriteLabel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-favourite-label-delete-popup',
    template: ''
})
export class FavouriteLabelDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private favouriteLabelPopupService: FavouriteLabelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.favouriteLabelPopupService
                .open(FavouriteLabelDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
