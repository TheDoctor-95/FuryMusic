import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { FavouriteAlbum } from './favourite-album.model';
import { FavouriteAlbumService } from './favourite-album.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-favourite-album',
    templateUrl: './favourite-album.component.html'
})
export class FavouriteAlbumComponent implements OnInit, OnDestroy {
favouriteAlbums: FavouriteAlbum[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private favouriteAlbumService: FavouriteAlbumService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.favouriteAlbumService.query().subscribe(
            (res: ResponseWrapper) => {
                this.favouriteAlbums = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFavouriteAlbums();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FavouriteAlbum) {
        return item.id;
    }
    registerChangeInFavouriteAlbums() {
        this.eventSubscriber = this.eventManager.subscribe('favouriteAlbumListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
