import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FavouriteAlbum } from './favourite-album.model';
import { FavouriteAlbumPopupService } from './favourite-album-popup.service';
import { FavouriteAlbumService } from './favourite-album.service';
import { Album, AlbumService } from '../album';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-favourite-album-dialog',
    templateUrl: './favourite-album-dialog.component.html'
})
export class FavouriteAlbumDialogComponent implements OnInit {

    favouriteAlbum: FavouriteAlbum;
    isSaving: boolean;

    albums: Album[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private favouriteAlbumService: FavouriteAlbumService,
        private albumService: AlbumService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.albumService.query()
            .subscribe((res: ResponseWrapper) => { this.albums = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.favouriteAlbum.id !== undefined) {
            this.subscribeToSaveResponse(
                this.favouriteAlbumService.update(this.favouriteAlbum));
        } else {
            this.subscribeToSaveResponse(
                this.favouriteAlbumService.create(this.favouriteAlbum));
        }
    }

    private subscribeToSaveResponse(result: Observable<FavouriteAlbum>) {
        result.subscribe((res: FavouriteAlbum) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FavouriteAlbum) {
        this.eventManager.broadcast({ name: 'favouriteAlbumListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAlbumById(index: number, item: Album) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-favourite-album-popup',
    template: ''
})
export class FavouriteAlbumPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private favouriteAlbumPopupService: FavouriteAlbumPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.favouriteAlbumPopupService
                    .open(FavouriteAlbumDialogComponent as Component, params['id']);
            } else {
                this.favouriteAlbumPopupService
                    .open(FavouriteAlbumDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
