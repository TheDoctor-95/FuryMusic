import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AlbumTypes } from './album-types.model';
import { AlbumTypesPopupService } from './album-types-popup.service';
import { AlbumTypesService } from './album-types.service';

@Component({
    selector: 'jhi-album-types-dialog',
    templateUrl: './album-types-dialog.component.html'
})
export class AlbumTypesDialogComponent implements OnInit {

    albumTypes: AlbumTypes;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private albumTypesService: AlbumTypesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.albumTypes.id !== undefined) {
            this.subscribeToSaveResponse(
                this.albumTypesService.update(this.albumTypes));
        } else {
            this.subscribeToSaveResponse(
                this.albumTypesService.create(this.albumTypes));
        }
    }

    private subscribeToSaveResponse(result: Observable<AlbumTypes>) {
        result.subscribe((res: AlbumTypes) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AlbumTypes) {
        this.eventManager.broadcast({ name: 'albumTypesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-album-types-popup',
    template: ''
})
export class AlbumTypesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private albumTypesPopupService: AlbumTypesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.albumTypesPopupService
                    .open(AlbumTypesDialogComponent as Component, params['id']);
            } else {
                this.albumTypesPopupService
                    .open(AlbumTypesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
