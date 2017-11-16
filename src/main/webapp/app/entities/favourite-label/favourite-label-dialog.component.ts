import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FavouriteLabel } from './favourite-label.model';
import { FavouriteLabelPopupService } from './favourite-label-popup.service';
import { FavouriteLabelService } from './favourite-label.service';
import { Label, LabelService } from '../label';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-favourite-label-dialog',
    templateUrl: './favourite-label-dialog.component.html'
})
export class FavouriteLabelDialogComponent implements OnInit {

    favouriteLabel: FavouriteLabel;
    isSaving: boolean;

    labels: Label[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private favouriteLabelService: FavouriteLabelService,
        private labelService: LabelService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.labelService.query()
            .subscribe((res: ResponseWrapper) => { this.labels = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.favouriteLabel.id !== undefined) {
            this.subscribeToSaveResponse(
                this.favouriteLabelService.update(this.favouriteLabel));
        } else {
            this.subscribeToSaveResponse(
                this.favouriteLabelService.create(this.favouriteLabel));
        }
    }

    private subscribeToSaveResponse(result: Observable<FavouriteLabel>) {
        result.subscribe((res: FavouriteLabel) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FavouriteLabel) {
        this.eventManager.broadcast({ name: 'favouriteLabelListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLabelById(index: number, item: Label) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-favourite-label-popup',
    template: ''
})
export class FavouriteLabelPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private favouriteLabelPopupService: FavouriteLabelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.favouriteLabelPopupService
                    .open(FavouriteLabelDialogComponent as Component, params['id']);
            } else {
                this.favouriteLabelPopupService
                    .open(FavouriteLabelDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
