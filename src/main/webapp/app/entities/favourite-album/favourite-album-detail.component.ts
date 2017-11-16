import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { FavouriteAlbum } from './favourite-album.model';
import { FavouriteAlbumService } from './favourite-album.service';

@Component({
    selector: 'jhi-favourite-album-detail',
    templateUrl: './favourite-album-detail.component.html'
})
export class FavouriteAlbumDetailComponent implements OnInit, OnDestroy {

    favouriteAlbum: FavouriteAlbum;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private favouriteAlbumService: FavouriteAlbumService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFavouriteAlbums();
    }

    load(id) {
        this.favouriteAlbumService.find(id).subscribe((favouriteAlbum) => {
            this.favouriteAlbum = favouriteAlbum;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFavouriteAlbums() {
        this.eventSubscriber = this.eventManager.subscribe(
            'favouriteAlbumListModification',
            (response) => this.load(this.favouriteAlbum.id)
        );
    }
}
