import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { FavouriteBand } from './favourite-band.model';
import { FavouriteBandService } from './favourite-band.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-favourite-band',
    templateUrl: './favourite-band.component.html'
})
export class FavouriteBandComponent implements OnInit, OnDestroy {
favouriteBands: FavouriteBand[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private favouriteBandService: FavouriteBandService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.favouriteBandService.query().subscribe(
            (res: ResponseWrapper) => {
                this.favouriteBands = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFavouriteBands();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FavouriteBand) {
        return item.id;
    }
    registerChangeInFavouriteBands() {
        this.eventSubscriber = this.eventManager.subscribe('favouriteBandListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
