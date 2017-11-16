import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Collection } from './collection.model';
import { CollectionService } from './collection.service';

@Component({
    selector: 'jhi-collection-detail',
    templateUrl: './collection-detail.component.html'
})
export class CollectionDetailComponent implements OnInit, OnDestroy {

    collection: Collection;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private collectionService: CollectionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCollections();
    }

    load(id) {
        this.collectionService.find(id).subscribe((collection) => {
            this.collection = collection;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCollections() {
        this.eventSubscriber = this.eventManager.subscribe(
            'collectionListModification',
            (response) => this.load(this.collection.id)
        );
    }
}
