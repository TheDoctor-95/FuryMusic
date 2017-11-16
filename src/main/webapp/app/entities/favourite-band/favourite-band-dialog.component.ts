import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FavouriteBand } from './favourite-band.model';
import { FavouriteBandPopupService } from './favourite-band-popup.service';
import { FavouriteBandService } from './favourite-band.service';
import { Band, BandService } from '../band';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-favourite-band-dialog',
    templateUrl: './favourite-band-dialog.component.html'
})
export class FavouriteBandDialogComponent implements OnInit {

    favouriteBand: FavouriteBand;
    isSaving: boolean;

    bands: Band[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private favouriteBandService: FavouriteBandService,
        private bandService: BandService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bandService.query()
            .subscribe((res: ResponseWrapper) => { this.bands = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.favouriteBand.id !== undefined) {
            this.subscribeToSaveResponse(
                this.favouriteBandService.update(this.favouriteBand));
        } else {
            this.subscribeToSaveResponse(
                this.favouriteBandService.create(this.favouriteBand));
        }
    }

    private subscribeToSaveResponse(result: Observable<FavouriteBand>) {
        result.subscribe((res: FavouriteBand) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FavouriteBand) {
        this.eventManager.broadcast({ name: 'favouriteBandListModification', content: 'OK'});
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

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-favourite-band-popup',
    template: ''
})
export class FavouriteBandPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private favouriteBandPopupService: FavouriteBandPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.favouriteBandPopupService
                    .open(FavouriteBandDialogComponent as Component, params['id']);
            } else {
                this.favouriteBandPopupService
                    .open(FavouriteBandDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
