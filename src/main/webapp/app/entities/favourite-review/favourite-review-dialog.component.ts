import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FavouriteReview } from './favourite-review.model';
import { FavouriteReviewPopupService } from './favourite-review-popup.service';
import { FavouriteReviewService } from './favourite-review.service';
import { Review, ReviewService } from '../review';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-favourite-review-dialog',
    templateUrl: './favourite-review-dialog.component.html'
})
export class FavouriteReviewDialogComponent implements OnInit {

    favouriteReview: FavouriteReview;
    isSaving: boolean;

    reviews: Review[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private favouriteReviewService: FavouriteReviewService,
        private reviewService: ReviewService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.reviewService.query()
            .subscribe((res: ResponseWrapper) => { this.reviews = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.favouriteReview.id !== undefined) {
            this.subscribeToSaveResponse(
                this.favouriteReviewService.update(this.favouriteReview));
        } else {
            this.subscribeToSaveResponse(
                this.favouriteReviewService.create(this.favouriteReview));
        }
    }

    private subscribeToSaveResponse(result: Observable<FavouriteReview>) {
        result.subscribe((res: FavouriteReview) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FavouriteReview) {
        this.eventManager.broadcast({ name: 'favouriteReviewListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackReviewById(index: number, item: Review) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-favourite-review-popup',
    template: ''
})
export class FavouriteReviewPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private favouriteReviewPopupService: FavouriteReviewPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.favouriteReviewPopupService
                    .open(FavouriteReviewDialogComponent as Component, params['id']);
            } else {
                this.favouriteReviewPopupService
                    .open(FavouriteReviewDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
