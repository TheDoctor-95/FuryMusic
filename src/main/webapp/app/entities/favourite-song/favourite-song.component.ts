import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { FavouriteSong } from './favourite-song.model';
import { FavouriteSongService } from './favourite-song.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-favourite-song',
    templateUrl: './favourite-song.component.html'
})
export class FavouriteSongComponent implements OnInit, OnDestroy {
favouriteSongs: FavouriteSong[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private favouriteSongService: FavouriteSongService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.favouriteSongService.query().subscribe(
            (res: ResponseWrapper) => {
                this.favouriteSongs = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFavouriteSongs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FavouriteSong) {
        return item.id;
    }
    registerChangeInFavouriteSongs() {
        this.eventSubscriber = this.eventManager.subscribe('favouriteSongListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
