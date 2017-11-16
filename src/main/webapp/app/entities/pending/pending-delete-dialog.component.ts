import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pending } from './pending.model';
import { PendingPopupService } from './pending-popup.service';
import { PendingService } from './pending.service';

@Component({
    selector: 'jhi-pending-delete-dialog',
    templateUrl: './pending-delete-dialog.component.html'
})
export class PendingDeleteDialogComponent {

    pending: Pending;

    constructor(
        private pendingService: PendingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pendingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pendingListModification',
                content: 'Deleted an pending'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pending-delete-popup',
    template: ''
})
export class PendingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pendingPopupService: PendingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pendingPopupService
                .open(PendingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
