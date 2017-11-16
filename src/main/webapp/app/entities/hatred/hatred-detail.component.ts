import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Hatred } from './hatred.model';
import { HatredService } from './hatred.service';

@Component({
    selector: 'jhi-hatred-detail',
    templateUrl: './hatred-detail.component.html'
})
export class HatredDetailComponent implements OnInit, OnDestroy {

    hatred: Hatred;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private hatredService: HatredService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHatreds();
    }

    load(id) {
        this.hatredService.find(id).subscribe((hatred) => {
            this.hatred = hatred;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHatreds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'hatredListModification',
            (response) => this.load(this.hatred.id)
        );
    }
}
