import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { RateAlbum } from './rate-album.model';
import { RateAlbumService } from './rate-album.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rate-album',
    templateUrl: './rate-album.component.html'
})
export class RateAlbumComponent implements OnInit, OnDestroy {
rateAlbums: RateAlbum[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private rateAlbumService: RateAlbumService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.rateAlbumService.query().subscribe(
            (res: ResponseWrapper) => {
                this.rateAlbums = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRateAlbums();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RateAlbum) {
        return item.id;
    }
    registerChangeInRateAlbums() {
        this.eventSubscriber = this.eventManager.subscribe('rateAlbumListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
