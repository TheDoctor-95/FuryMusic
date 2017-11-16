import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ArtistBandStatus } from './artist-band-status.model';
import { ArtistBandStatusService } from './artist-band-status.service';

@Injectable()
export class ArtistBandStatusPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private artistBandStatusService: ArtistBandStatusService

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
                this.artistBandStatusService.find(id).subscribe((artistBandStatus) => {
                    if (artistBandStatus.incorporationDate) {
                        artistBandStatus.incorporationDate = {
                            year: artistBandStatus.incorporationDate.getFullYear(),
                            month: artistBandStatus.incorporationDate.getMonth() + 1,
                            day: artistBandStatus.incorporationDate.getDate()
                        };
                    }
                    if (artistBandStatus.leavingDate) {
                        artistBandStatus.leavingDate = {
                            year: artistBandStatus.leavingDate.getFullYear(),
                            month: artistBandStatus.leavingDate.getMonth() + 1,
                            day: artistBandStatus.leavingDate.getDate()
                        };
                    }
                    this.ngbModalRef = this.artistBandStatusModalRef(component, artistBandStatus);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.artistBandStatusModalRef(component, new ArtistBandStatus());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    artistBandStatusModalRef(component: Component, artistBandStatus: ArtistBandStatus): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.artistBandStatus = artistBandStatus;
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
