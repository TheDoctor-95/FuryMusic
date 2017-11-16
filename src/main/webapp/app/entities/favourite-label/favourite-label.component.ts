import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { FavouriteLabel } from './favourite-label.model';
import { FavouriteLabelService } from './favourite-label.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-favourite-label',
    templateUrl: './favourite-label.component.html'
})
export class FavouriteLabelComponent implements OnInit, OnDestroy {
favouriteLabels: FavouriteLabel[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private favouriteLabelService: FavouriteLabelService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.favouriteLabelService.query().subscribe(
            (res: ResponseWrapper) => {
                this.favouriteLabels = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFavouriteLabels();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FavouriteLabel) {
        return item.id;
    }
    registerChangeInFavouriteLabels() {
        this.eventSubscriber = this.eventManager.subscribe('favouriteLabelListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
