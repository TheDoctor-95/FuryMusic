import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Concerts } from './concerts.model';
import { ConcertsPopupService } from './concerts-popup.service';
import { ConcertsService } from './concerts.service';

@Component({
    selector: 'jhi-concerts-delete-dialog',
    templateUrl: './concerts-delete-dialog.component.html'
})
export class ConcertsDeleteDialogComponent {

    concerts: Concerts;

    constructor(
        private concertsService: ConcertsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.concertsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'concertsListModification',
                content: 'Deleted an concerts'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-concerts-delete-popup',
    template: ''
})
export class ConcertsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private concertsPopupService: ConcertsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.concertsPopupService
                .open(ConcertsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
