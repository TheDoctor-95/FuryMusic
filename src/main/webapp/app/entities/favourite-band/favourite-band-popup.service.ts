import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FavouriteBand } from './favourite-band.model';
import { FavouriteBandService } from './favourite-band.service';

@Injectable()
export class FavouriteBandPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private favouriteBandService: FavouriteBandService

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
                this.favouriteBandService.find(id).subscribe((favouriteBand) => {
                    favouriteBand.date = this.datePipe
                        .transform(favouriteBand.date, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.favouriteBandModalRef(component, favouriteBand);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.favouriteBandModalRef(component, new FavouriteBand());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    favouriteBandModalRef(component: Component, favouriteBand: FavouriteBand): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.favouriteBand = favouriteBand;
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
