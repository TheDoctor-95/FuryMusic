import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FavouriteSong } from './favourite-song.model';
import { FavouriteSongPopupService } from './favourite-song-popup.service';
import { FavouriteSongService } from './favourite-song.service';
import { Song, SongService } from '../song';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-favourite-song-dialog',
    templateUrl: './favourite-song-dialog.component.html'
})
export class FavouriteSongDialogComponent implements OnInit {

    favouriteSong: FavouriteSong;
    isSaving: boolean;

    songs: Song[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private favouriteSongService: FavouriteSongService,
        private songService: SongService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.songService.query()
            .subscribe((res: ResponseWrapper) => { this.songs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.favouriteSong.id !== undefined) {
            this.subscribeToSaveResponse(
                this.favouriteSongService.update(this.favouriteSong));
        } else {
            this.subscribeToSaveResponse(
                this.favouriteSongService.create(this.favouriteSong));
        }
    }

    private subscribeToSaveResponse(result: Observable<FavouriteSong>) {
        result.subscribe((res: FavouriteSong) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FavouriteSong) {
        this.eventManager.broadcast({ name: 'favouriteSongListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSongById(index: number, item: Song) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-favourite-song-popup',
    template: ''
})
export class FavouriteSongPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private favouriteSongPopupService: FavouriteSongPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.favouriteSongPopupService
                    .open(FavouriteSongDialogComponent as Component, params['id']);
            } else {
                this.favouriteSongPopupService
                    .open(FavouriteSongDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
