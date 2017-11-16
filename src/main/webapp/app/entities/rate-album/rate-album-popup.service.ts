import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { RateAlbum } from './rate-album.model';
import { RateAlbumService } from './rate-album.service';

@Injectable()
export class RateAlbumPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private rateAlbumService: RateAlbumService

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
                this.rateAlbumService.find(id).subscribe((rateAlbum) => {
                    rateAlbum.date = this.datePipe
                        .transform(rateAlbum.date, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.rateAlbumModalRef(component, rateAlbum);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.rateAlbumModalRef(component, new RateAlbum());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    rateAlbumModalRef(component: Component, rateAlbum: RateAlbum): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.rateAlbum = rateAlbum;
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
