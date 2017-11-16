import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FavouriteBandComponent } from './favourite-band.component';
import { FavouriteBandDetailComponent } from './favourite-band-detail.component';
import { FavouriteBandPopupComponent } from './favourite-band-dialog.component';
import { FavouriteBandDeletePopupComponent } from './favourite-band-delete-dialog.component';

export const favouriteBandRoute: Routes = [
    {
        path: 'favourite-band',
        component: FavouriteBandComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteBand.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'favourite-band/:id',
        component: FavouriteBandDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteBand.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const favouriteBandPopupRoute: Routes = [
    {
        path: 'favourite-band-new',
        component: FavouriteBandPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteBand.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'favourite-band/:id/edit',
        component: FavouriteBandPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteBand.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'favourite-band/:id/delete',
        component: FavouriteBandDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteBand.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
