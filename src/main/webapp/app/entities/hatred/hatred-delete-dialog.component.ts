import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Hatred } from './hatred.model';
import { HatredPopupService } from './hatred-popup.service';
import { HatredService } from './hatred.service';

@Component({
    selector: 'jhi-hatred-delete-dialog',
    templateUrl: './hatred-delete-dialog.component.html'
})
export class HatredDeleteDialogComponent {

    hatred: Hatred;

    constructor(
        private hatredService: HatredService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hatredService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'hatredListModification',
                content: 'Deleted an hatred'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hatred-delete-popup',
    template: ''
})
export class HatredDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private hatredPopupService: HatredPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.hatredPopupService
                .open(HatredDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
