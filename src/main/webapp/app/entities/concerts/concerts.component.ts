import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Concerts } from './concerts.model';
import { ConcertsService } from './concerts.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-concerts',
    templateUrl: './concerts.component.html'
})
export class ConcertsComponent implements OnInit, OnDestroy {
concerts: Concerts[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private concertsService: ConcertsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.concertsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.concerts = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInConcerts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Concerts) {
        return item.id;
    }
    registerChangeInConcerts() {
        this.eventSubscriber = this.eventManager.subscribe('concertsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
