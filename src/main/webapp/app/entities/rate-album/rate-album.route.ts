import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RateAlbumComponent } from './rate-album.component';
import { RateAlbumDetailComponent } from './rate-album-detail.component';
import { RateAlbumPopupComponent } from './rate-album-dialog.component';
import { RateAlbumDeletePopupComponent } from './rate-album-delete-dialog.component';

export const rateAlbumRoute: Routes = [
    {
        path: 'rate-album',
        component: RateAlbumComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.rateAlbum.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'rate-album/:id',
        component: RateAlbumDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.rateAlbum.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rateAlbumPopupRoute: Routes = [
    {
        path: 'rate-album-new',
        component: RateAlbumPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.rateAlbum.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rate-album/:id/edit',
        component: RateAlbumPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.rateAlbum.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rate-album/:id/delete',
        component: RateAlbumDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.rateAlbum.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
