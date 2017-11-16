import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { FavouriteBand } from './favourite-band.model';
import { FavouriteBandService } from './favourite-band.service';

@Component({
    selector: 'jhi-favourite-band-detail',
    templateUrl: './favourite-band-detail.component.html'
})
export class FavouriteBandDetailComponent implements OnInit, OnDestroy {

    favouriteBand: FavouriteBand;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private favouriteBandService: FavouriteBandService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFavouriteBands();
    }

    load(id) {
        this.favouriteBandService.find(id).subscribe((favouriteBand) => {
            this.favouriteBand = favouriteBand;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFavouriteBands() {
        this.eventSubscriber = this.eventManager.subscribe(
            'favouriteBandListModification',
            (response) => this.load(this.favouriteBand.id)
        );
    }
}
