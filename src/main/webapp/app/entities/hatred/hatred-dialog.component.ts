import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Hatred } from './hatred.model';
import { HatredPopupService } from './hatred-popup.service';
import { HatredService } from './hatred.service';
import { User, UserService } from '../../shared';
import { Band, BandService } from '../band';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-hatred-dialog',
    templateUrl: './hatred-dialog.component.html'
})
export class HatredDialogComponent implements OnInit {

    hatred: Hatred;
    isSaving: boolean;

    users: User[];

    bands: Band[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private hatredService: HatredService,
        private userService: UserService,
        private bandService: BandService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.bandService.query()
            .subscribe((res: ResponseWrapper) => { this.bands = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.hatred.id !== undefined) {
            this.subscribeToSaveResponse(
                this.hatredService.update(this.hatred));
        } else {
            this.subscribeToSaveResponse(
                this.hatredService.create(this.hatred));
        }
    }

    private subscribeToSaveResponse(result: Observable<Hatred>) {
        result.subscribe((res: Hatred) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Hatred) {
        this.eventManager.broadcast({ name: 'hatredListModification', content: 'OK'});
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

    trackBandById(index: number, item: Band) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-hatred-popup',
    template: ''
})
export class HatredPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private hatredPopupService: HatredPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.hatredPopupService
                    .open(HatredDialogComponent as Component, params['id']);
            } else {
                this.hatredPopupService
                    .open(HatredDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
