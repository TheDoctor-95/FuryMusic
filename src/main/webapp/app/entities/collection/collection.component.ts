import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Collection } from './collection.model';
import { CollectionService } from './collection.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-collection',
    templateUrl: './collection.component.html'
})
export class CollectionComponent implements OnInit, OnDestroy {
collections: Collection[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private collectionService: CollectionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.collectionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.collections = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCollections();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Collection) {
        return item.id;
    }
    registerChangeInCollections() {
        this.eventSubscriber = this.eventManager.subscribe('collectionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
