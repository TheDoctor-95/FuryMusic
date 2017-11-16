import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AlbumTypes } from './album-types.model';
import { AlbumTypesService } from './album-types.service';

@Component({
    selector: 'jhi-album-types-detail',
    templateUrl: './album-types-detail.component.html'
})
export class AlbumTypesDetailComponent implements OnInit, OnDestroy {

    albumTypes: AlbumTypes;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private albumTypesService: AlbumTypesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAlbumTypes();
    }

    load(id) {
        this.albumTypesService.find(id).subscribe((albumTypes) => {
            this.albumTypes = albumTypes;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAlbumTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'albumTypesListModification',
            (response) => this.load(this.albumTypes.id)
        );
    }
}
