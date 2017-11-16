import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { FavouriteReview } from './favourite-review.model';
import { FavouriteReviewService } from './favourite-review.service';

@Component({
    selector: 'jhi-favourite-review-detail',
    templateUrl: './favourite-review-detail.component.html'
})
export class FavouriteReviewDetailComponent implements OnInit, OnDestroy {

    favouriteReview: FavouriteReview;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private favouriteReviewService: FavouriteReviewService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFavouriteReviews();
    }

    load(id) {
        this.favouriteReviewService.find(id).subscribe((favouriteReview) => {
            this.favouriteReview = favouriteReview;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFavouriteReviews() {
        this.eventSubscriber = this.eventManager.subscribe(
            'favouriteReviewListModification',
            (response) => this.load(this.favouriteReview.id)
        );
    }
}
