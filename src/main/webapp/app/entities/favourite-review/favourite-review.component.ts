import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { FavouriteReview } from './favourite-review.model';
import { FavouriteReviewService } from './favourite-review.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-favourite-review',
    templateUrl: './favourite-review.component.html'
})
export class FavouriteReviewComponent implements OnInit, OnDestroy {
favouriteReviews: FavouriteReview[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private favouriteReviewService: FavouriteReviewService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.favouriteReviewService.query().subscribe(
            (res: ResponseWrapper) => {
                this.favouriteReviews = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFavouriteReviews();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FavouriteReview) {
        return item.id;
    }
    registerChangeInFavouriteReviews() {
        this.eventSubscriber = this.eventManager.subscribe('favouriteReviewListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
