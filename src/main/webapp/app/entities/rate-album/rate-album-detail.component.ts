import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { RateAlbum } from './rate-album.model';
import { RateAlbumService } from './rate-album.service';

@Component({
    selector: 'jhi-rate-album-detail',
    templateUrl: './rate-album-detail.component.html'
})
export class RateAlbumDetailComponent implements OnInit, OnDestroy {

    rateAlbum: RateAlbum;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rateAlbumService: RateAlbumService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRateAlbums();
    }

    load(id) {
        this.rateAlbumService.find(id).subscribe((rateAlbum) => {
            this.rateAlbum = rateAlbum;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRateAlbums() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rateAlbumListModification',
            (response) => this.load(this.rateAlbum.id)
        );
    }
}
