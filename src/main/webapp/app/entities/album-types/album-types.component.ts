import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { AlbumTypes } from './album-types.model';
import { AlbumTypesService } from './album-types.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-album-types',
    templateUrl: './album-types.component.html'
})
export class AlbumTypesComponent implements OnInit, OnDestroy {
albumTypes: AlbumTypes[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private albumTypesService: AlbumTypesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.albumTypesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.albumTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAlbumTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AlbumTypes) {
        return item.id;
    }
    registerChangeInAlbumTypes() {
        this.eventSubscriber = this.eventManager.subscribe('albumTypesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
