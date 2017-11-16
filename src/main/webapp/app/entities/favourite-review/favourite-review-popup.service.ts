import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FavouriteReview } from './favourite-review.model';
import { FavouriteReviewService } from './favourite-review.service';

@Injectable()
export class FavouriteReviewPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private favouriteReviewService: FavouriteReviewService

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
                this.favouriteReviewService.find(id).subscribe((favouriteReview) => {
                    favouriteReview.date = this.datePipe
                        .transform(favouriteReview.date, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.favouriteReviewModalRef(component, favouriteReview);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.favouriteReviewModalRef(component, new FavouriteReview());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    favouriteReviewModalRef(component: Component, favouriteReview: FavouriteReview): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.favouriteReview = favouriteReview;
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
