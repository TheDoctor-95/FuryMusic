import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { FavouriteLabel } from './favourite-label.model';
import { FavouriteLabelService } from './favourite-label.service';

@Component({
    selector: 'jhi-favourite-label-detail',
    templateUrl: './favourite-label-detail.component.html'
})
export class FavouriteLabelDetailComponent implements OnInit, OnDestroy {

    favouriteLabel: FavouriteLabel;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private favouriteLabelService: FavouriteLabelService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFavouriteLabels();
    }

    load(id) {
        this.favouriteLabelService.find(id).subscribe((favouriteLabel) => {
            this.favouriteLabel = favouriteLabel;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFavouriteLabels() {
        this.eventSubscriber = this.eventManager.subscribe(
            'favouriteLabelListModification',
            (response) => this.load(this.favouriteLabel.id)
        );
    }
}
