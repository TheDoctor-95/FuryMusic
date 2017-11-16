import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Concerts } from './concerts.model';
import { ConcertsService } from './concerts.service';

@Injectable()
export class ConcertsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private concertsService: ConcertsService

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
                this.concertsService.find(id).subscribe((concerts) => {
                    if (concerts.date) {
                        concerts.date = {
                            year: concerts.date.getFullYear(),
                            month: concerts.date.getMonth() + 1,
                            day: concerts.date.getDate()
                        };
                    }
                    this.ngbModalRef = this.concertsModalRef(component, concerts);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.concertsModalRef(component, new Concerts());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    concertsModalRef(component: Component, concerts: Concerts): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.concerts = concerts;
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
