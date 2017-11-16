import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Collection } from './collection.model';
import { CollectionPopupService } from './collection-popup.service';
import { CollectionService } from './collection.service';
import { User, UserService } from '../../shared';
import { Song, SongService } from '../song';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-collection-dialog',
    templateUrl: './collection-dialog.component.html'
})
export class CollectionDialogComponent implements OnInit {

    collection: Collection;
    isSaving: boolean;

    users: User[];

    songs: Song[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private collectionService: CollectionService,
        private userService: UserService,
        private songService: SongService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.songService.query()
            .subscribe((res: ResponseWrapper) => { this.songs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.collection.id !== undefined) {
            this.subscribeToSaveResponse(
                this.collectionService.update(this.collection));
        } else {
            this.subscribeToSaveResponse(
                this.collectionService.create(this.collection));
        }
    }

    private subscribeToSaveResponse(result: Observable<Collection>) {
        result.subscribe((res: Collection) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Collection) {
        this.eventManager.broadcast({ name: 'collectionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackSongById(index: number, item: Song) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-collection-popup',
    template: ''
})
export class CollectionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private collectionPopupService: CollectionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.collectionPopupService
                    .open(CollectionDialogComponent as Component, params['id']);
            } else {
                this.collectionPopupService
                    .open(CollectionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
