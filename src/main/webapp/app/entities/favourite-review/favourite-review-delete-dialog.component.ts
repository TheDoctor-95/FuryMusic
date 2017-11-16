import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FavouriteReview } from './favourite-review.model';
import { FavouriteReviewPopupService } from './favourite-review-popup.service';
import { FavouriteReviewService } from './favourite-review.service';

@Component({
    selector: 'jhi-favourite-review-delete-dialog',
    templateUrl: './favourite-review-delete-dialog.component.html'
})
export class FavouriteReviewDeleteDialogComponent {

    favouriteReview: FavouriteReview;

    constructor(
        private favouriteReviewService: FavouriteReviewService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.favouriteReviewService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'favouriteReviewListModification',
                content: 'Deleted an favouriteReview'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-favourite-review-delete-popup',
    template: ''
})
export class FavouriteReviewDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private favouriteReviewPopupService: FavouriteReviewPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.favouriteReviewPopupService
                .open(FavouriteReviewDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
