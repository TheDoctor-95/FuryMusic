import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RateAlbum } from './rate-album.model';
import { RateAlbumPopupService } from './rate-album-popup.service';
import { RateAlbumService } from './rate-album.service';
import { Album, AlbumService } from '../album';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rate-album-dialog',
    templateUrl: './rate-album-dialog.component.html'
})
export class RateAlbumDialogComponent implements OnInit {

    rateAlbum: RateAlbum;
    isSaving: boolean;

    albums: Album[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private rateAlbumService: RateAlbumService,
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
        if (this.rateAlbum.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rateAlbumService.update(this.rateAlbum));
        } else {
            this.subscribeToSaveResponse(
                this.rateAlbumService.create(this.rateAlbum));
        }
    }

    private subscribeToSaveResponse(result: Observable<RateAlbum>) {
        result.subscribe((res: RateAlbum) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RateAlbum) {
        this.eventManager.broadcast({ name: 'rateAlbumListModification', content: 'OK'});
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
    selector: 'jhi-rate-album-popup',
    template: ''
})
export class RateAlbumPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rateAlbumPopupService: RateAlbumPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rateAlbumPopupService
                    .open(RateAlbumDialogComponent as Component, params['id']);
            } else {
                this.rateAlbumPopupService
                    .open(RateAlbumDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
