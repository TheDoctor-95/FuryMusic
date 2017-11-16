import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FavouriteAlbum } from './favourite-album.model';
import { FavouriteAlbumPopupService } from './favourite-album-popup.service';
import { FavouriteAlbumService } from './favourite-album.service';

@Component({
    selector: 'jhi-favourite-album-delete-dialog',
    templateUrl: './favourite-album-delete-dialog.component.html'
})
export class FavouriteAlbumDeleteDialogComponent {

    favouriteAlbum: FavouriteAlbum;

    constructor(
        private favouriteAlbumService: FavouriteAlbumService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.favouriteAlbumService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'favouriteAlbumListModification',
                content: 'Deleted an favouriteAlbum'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-favourite-album-delete-popup',
    template: ''
})
export class FavouriteAlbumDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private favouriteAlbumPopupService: FavouriteAlbumPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.favouriteAlbumPopupService
                .open(FavouriteAlbumDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
