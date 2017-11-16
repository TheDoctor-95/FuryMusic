import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ArtistBandStatus } from './artist-band-status.model';
import { ArtistBandStatusService } from './artist-band-status.service';

@Component({
    selector: 'jhi-artist-band-status-detail',
    templateUrl: './artist-band-status-detail.component.html'
})
export class ArtistBandStatusDetailComponent implements OnInit, OnDestroy {

    artistBandStatus: ArtistBandStatus;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private artistBandStatusService: ArtistBandStatusService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInArtistBandStatuses();
    }

    load(id) {
        this.artistBandStatusService.find(id).subscribe((artistBandStatus) => {
            this.artistBandStatus = artistBandStatus;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInArtistBandStatuses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'artistBandStatusListModification',
            (response) => this.load(this.artistBandStatus.id)
        );
    }
}
