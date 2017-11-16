import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pending } from './pending.model';
import { PendingPopupService } from './pending-popup.service';
import { PendingService } from './pending.service';
import { User, UserService } from '../../shared';
import { Album, AlbumService } from '../album';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pending-dialog',
    templateUrl: './pending-dialog.component.html'
})
export class PendingDialogComponent implements OnInit {

    pending: Pending;
    isSaving: boolean;

    users: User[];

    albums: Album[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pendingService: PendingService,
        private userService: UserService,
        private albumService: AlbumService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.albumService.query()
            .subscribe((res: ResponseWrapper) => { this.albums = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pending.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pendingService.update(this.pending));
        } else {
            this.subscribeToSaveResponse(
                this.pendingService.create(this.pending));
        }
    }

    private subscribeToSaveResponse(result: Observable<Pending>) {
        result.subscribe((res: Pending) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Pending) {
        this.eventManager.broadcast({ name: 'pendingListModification', content: 'OK'});
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

    trackAlbumById(index: number, item: Album) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pending-popup',
    template: ''
})
export class PendingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pendingPopupService: PendingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pendingPopupService
                    .open(PendingDialogComponent as Component, params['id']);
            } else {
                this.pendingPopupService
                    .open(PendingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
