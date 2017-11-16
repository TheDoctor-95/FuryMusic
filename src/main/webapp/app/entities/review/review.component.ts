import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Review } from './review.model';
import { ReviewService } from './review.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-review',
    templateUrl: './review.component.html'
})
export class ReviewComponent implements OnInit, OnDestroy {
reviews: Review[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private reviewService: ReviewService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.reviewService.query().subscribe(
            (res: ResponseWrapper) => {
                this.reviews = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInReviews();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Review) {
        return item.id;
    }
    registerChangeInReviews() {
        this.eventSubscriber = this.eventManager.subscribe('reviewListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
