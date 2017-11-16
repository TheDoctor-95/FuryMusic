import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Hatred } from './hatred.model';
import { HatredService } from './hatred.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-hatred',
    templateUrl: './hatred.component.html'
})
export class HatredComponent implements OnInit, OnDestroy {
hatreds: Hatred[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private hatredService: HatredService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.hatredService.query().subscribe(
            (res: ResponseWrapper) => {
                this.hatreds = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInHatreds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Hatred) {
        return item.id;
    }
    registerChangeInHatreds() {
        this.eventSubscriber = this.eventManager.subscribe('hatredListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
