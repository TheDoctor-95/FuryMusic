import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FavouriteLabel } from './favourite-label.model';
import { FavouriteLabelService } from './favourite-label.service';

@Injectable()
export class FavouriteLabelPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private favouriteLabelService: FavouriteLabelService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.favouriteLabelService.find(id).subscribe((favouriteLabel) => {
                    favouriteLabel.date = this.datePipe
                        .transform(favouriteLabel.date, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.favouriteLabelModalRef(component, favouriteLabel);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.favouriteLabelModalRef(component, new FavouriteLabel());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    favouriteLabelModalRef(component: Component, favouriteLabel: FavouriteLabel): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.favouriteLabel = favouriteLabel;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
