import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Pending } from './pending.model';
import { PendingService } from './pending.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pending',
    templateUrl: './pending.component.html'
})
export class PendingComponent implements OnInit, OnDestroy {
pendings: Pending[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private pendingService: PendingService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.pendingService.query().subscribe(
            (res: ResponseWrapper) => {
                this.pendings = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPendings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Pending) {
        return item.id;
    }
    registerChangeInPendings() {
        this.eventSubscriber = this.eventManager.subscribe('pendingListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
