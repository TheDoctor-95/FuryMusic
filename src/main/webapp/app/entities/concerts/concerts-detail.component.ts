import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Concerts } from './concerts.model';
import { ConcertsService } from './concerts.service';

@Component({
    selector: 'jhi-concerts-detail',
    templateUrl: './concerts-detail.component.html'
})
export class ConcertsDetailComponent implements OnInit, OnDestroy {

    concerts: Concerts;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private concertsService: ConcertsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInConcerts();
    }

    load(id) {
        this.concertsService.find(id).subscribe((concerts) => {
            this.concerts = concerts;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInConcerts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'concertsListModification',
            (response) => this.load(this.concerts.id)
        );
    }
}
