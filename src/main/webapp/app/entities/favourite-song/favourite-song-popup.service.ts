import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FavouriteSong } from './favourite-song.model';
import { FavouriteSongService } from './favourite-song.service';

@Injectable()
export class FavouriteSongPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private favouriteSongService: FavouriteSongService

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
                this.favouriteSongService.find(id).subscribe((favouriteSong) => {
                    favouriteSong.date = this.datePipe
                        .transform(favouriteSong.date, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.favouriteSongModalRef(component, favouriteSong);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.favouriteSongModalRef(component, new FavouriteSong());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    favouriteSongModalRef(component: Component, favouriteSong: FavouriteSong): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.favouriteSong = favouriteSong;
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
