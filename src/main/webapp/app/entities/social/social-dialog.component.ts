import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Social } from './social.model';
import { SocialPopupService } from './social-popup.service';
import { SocialService } from './social.service';
import { Artist, ArtistService } from '../artist';
import { Band, BandService } from '../band';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-social-dialog',
    templateUrl: './social-dialog.component.html'
})
export class SocialDialogComponent implements OnInit {

    social: Social;
    isSaving: boolean;

    artists: Artist[];

    bands: Band[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private socialService: SocialService,
        private artistService: ArtistService,
        private bandService: BandService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.artistService.query()
            .subscribe((res: ResponseWrapper) => { this.artists = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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
        if (this.social.id !== undefined) {
            this.subscribeToSaveResponse(
                this.socialService.update(this.social));
        } else {
            this.subscribeToSaveResponse(
                this.socialService.create(this.social));
        }
    }

    private subscribeToSaveResponse(result: Observable<Social>) {
        result.subscribe((res: Social) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Social) {
        this.eventManager.broadcast({ name: 'socialListModification', content: 'OK'});
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

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-social-popup',
    template: ''
})
export class SocialPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private socialPopupService: SocialPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.socialPopupService
                    .open(SocialDialogComponent as Component, params['id']);
            } else {
                this.socialPopupService
                    .open(SocialDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
