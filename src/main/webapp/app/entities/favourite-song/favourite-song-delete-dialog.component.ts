import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FavouriteSong } from './favourite-song.model';
import { FavouriteSongPopupService } from './favourite-song-popup.service';
import { FavouriteSongService } from './favourite-song.service';

@Component({
    selector: 'jhi-favourite-song-delete-dialog',
    templateUrl: './favourite-song-delete-dialog.component.html'
})
export class FavouriteSongDeleteDialogComponent {

    favouriteSong: FavouriteSong;

    constructor(
        private favouriteSongService: FavouriteSongService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.favouriteSongService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'favouriteSongListModification',
                content: 'Deleted an favouriteSong'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-favourite-song-delete-popup',
    template: ''
})
export class FavouriteSongDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private favouriteSongPopupService: FavouriteSongPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.favouriteSongPopupService
                .open(FavouriteSongDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
