import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Concerts } from './concerts.model';
import { ConcertsPopupService } from './concerts-popup.service';
import { ConcertsService } from './concerts.service';
import { Band, BandService } from '../band';
import { Artist, ArtistService } from '../artist';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-concerts-dialog',
    templateUrl: './concerts-dialog.component.html'
})
export class ConcertsDialogComponent implements OnInit {

    concerts: Concerts;
    isSaving: boolean;

    bands: Band[];

    artists: Artist[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private concertsService: ConcertsService,
        private bandService: BandService,
        private artistService: ArtistService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bandService.query()
            .subscribe((res: ResponseWrapper) => { this.bands = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.artistService.query()
            .subscribe((res: ResponseWrapper) => { this.artists = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.concerts.id !== undefined) {
            this.subscribeToSaveResponse(
                this.concertsService.update(this.concerts));
        } else {
            this.subscribeToSaveResponse(
                this.concertsService.create(this.concerts));
        }
    }

    private subscribeToSaveResponse(result: Observable<Concerts>) {
        result.subscribe((res: Concerts) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Concerts) {
        this.eventManager.broadcast({ name: 'concertsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBandById(index: number, item: Band) {
        return item.id;
    }

    trackArtistById(index: number, item: Artist) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-concerts-popup',
    template: ''
})
export class ConcertsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private concertsPopupService: ConcertsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.concertsPopupService
                    .open(ConcertsDialogComponent as Component, params['id']);
            } else {
                this.concertsPopupService
                    .open(ConcertsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
