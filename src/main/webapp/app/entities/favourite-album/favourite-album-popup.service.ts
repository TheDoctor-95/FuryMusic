import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FavouriteAlbum } from './favourite-album.model';
import { FavouriteAlbumService } from './favourite-album.service';

@Injectable()
export class FavouriteAlbumPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private favouriteAlbumService: FavouriteAlbumService

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
                this.favouriteAlbumService.find(id).subscribe((favouriteAlbum) => {
                    favouriteAlbum.date = this.datePipe
                        .transform(favouriteAlbum.date, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.favouriteAlbumModalRef(component, favouriteAlbum);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.favouriteAlbumModalRef(component, new FavouriteAlbum());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    favouriteAlbumModalRef(component: Component, favouriteAlbum: FavouriteAlbum): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.favouriteAlbum = favouriteAlbum;
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
