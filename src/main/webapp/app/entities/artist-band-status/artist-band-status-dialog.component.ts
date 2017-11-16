import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ArtistBandStatus } from './artist-band-status.model';
import { ArtistBandStatusPopupService } from './artist-band-status-popup.service';
import { ArtistBandStatusService } from './artist-band-status.service';
import { Artist, ArtistService } from '../artist';
import { Band, BandService } from '../band';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-artist-band-status-dialog',
    templateUrl: './artist-band-status-dialog.component.html'
})
export class ArtistBandStatusDialogComponent implements OnInit {

    artistBandStatus: ArtistBandStatus;
    isSaving: boolean;

    artists: Artist[];

    bands: Band[];
    incorporationDateDp: any;
    leavingDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private artistBandStatusService: ArtistBandStatusService,
        private artistService: ArtistService,
        private bandService: BandService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.artistService.query()
            .subscribe((res: ResponseWrapper) => { this.artists = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.bandService.query()
            .subscribe((res: ResponseWrapper) => { this.bands = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.artistBandStatus.id !== undefined) {
            this.subscribeToSaveResponse(
                this.artistBandStatusService.update(this.artistBandStatus));
        } else {
            this.subscribeToSaveResponse(
                this.artistBandStatusService.create(this.artistBandStatus));
        }
    }

    private subscribeToSaveResponse(result: Observable<ArtistBandStatus>) {
        result.subscribe((res: ArtistBandStatus) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ArtistBandStatus) {
        this.eventManager.broadcast({ name: 'artistBandStatusListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackArtistById(index: number, item: Artist) {
        return item.id;
    }

    trackBandById(index: number, item: Band) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-artist-band-status-popup',
    template: ''
})
export class ArtistBandStatusPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private artistBandStatusPopupService: ArtistBandStatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.artistBandStatusPopupService
                    .open(ArtistBandStatusDialogComponent as Component, params['id']);
            } else {
                this.artistBandStatusPopupService
                    .open(ArtistBandStatusDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
