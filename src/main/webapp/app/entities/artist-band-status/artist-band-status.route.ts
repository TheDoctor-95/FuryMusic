import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ArtistBandStatusComponent } from './artist-band-status.component';
import { ArtistBandStatusDetailComponent } from './artist-band-status-detail.component';
import { ArtistBandStatusPopupComponent } from './artist-band-status-dialog.component';
import { ArtistBandStatusDeletePopupComponent } from './artist-band-status-delete-dialog.component';

export const artistBandStatusRoute: Routes = [
    {
        path: 'artist-band-status',
        component: ArtistBandStatusComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.artistBandStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'artist-band-status/:id',
        component: ArtistBandStatusDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.artistBandStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const artistBandStatusPopupRoute: Routes = [
    {
        path: 'artist-band-status-new',
        component: ArtistBandStatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.artistBandStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'artist-band-status/:id/edit',
        component: ArtistBandStatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.artistBandStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'artist-band-status/:id/delete',
        component: ArtistBandStatusDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.artistBandStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
