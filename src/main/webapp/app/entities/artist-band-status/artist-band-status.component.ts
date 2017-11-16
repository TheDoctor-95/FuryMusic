import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ArtistBandStatus } from './artist-band-status.model';
import { ArtistBandStatusService } from './artist-band-status.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-artist-band-status',
    templateUrl: './artist-band-status.component.html'
})
export class ArtistBandStatusComponent implements OnInit, OnDestroy {
artistBandStatuses: ArtistBandStatus[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private artistBandStatusService: ArtistBandStatusService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.artistBandStatusService.query().subscribe(
            (res: ResponseWrapper) => {
                this.artistBandStatuses = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInArtistBandStatuses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ArtistBandStatus) {
        return item.id;
    }
    registerChangeInArtistBandStatuses() {
        this.eventSubscriber = this.eventManager.subscribe('artistBandStatusListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
