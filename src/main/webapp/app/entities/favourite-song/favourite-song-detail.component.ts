import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { FavouriteSong } from './favourite-song.model';
import { FavouriteSongService } from './favourite-song.service';

@Component({
    selector: 'jhi-favourite-song-detail',
    templateUrl: './favourite-song-detail.component.html'
})
export class FavouriteSongDetailComponent implements OnInit, OnDestroy {

    favouriteSong: FavouriteSong;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private favouriteSongService: FavouriteSongService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFavouriteSongs();
    }

    load(id) {
        this.favouriteSongService.find(id).subscribe((favouriteSong) => {
            this.favouriteSong = favouriteSong;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFavouriteSongs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'favouriteSongListModification',
            (response) => this.load(this.favouriteSong.id)
        );
    }
}
