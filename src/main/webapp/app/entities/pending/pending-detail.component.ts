import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Pending } from './pending.model';
import { PendingService } from './pending.service';

@Component({
    selector: 'jhi-pending-detail',
    templateUrl: './pending-detail.component.html'
})
export class PendingDetailComponent implements OnInit, OnDestroy {

    pending: Pending;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pendingService: PendingService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPendings();
    }

    load(id) {
        this.pendingService.find(id).subscribe((pending) => {
            this.pending = pending;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPendings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pendingListModification',
            (response) => this.load(this.pending.id)
        );
    }
}
