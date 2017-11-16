import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FavouriteLabelComponent } from './favourite-label.component';
import { FavouriteLabelDetailComponent } from './favourite-label-detail.component';
import { FavouriteLabelPopupComponent } from './favourite-label-dialog.component';
import { FavouriteLabelDeletePopupComponent } from './favourite-label-delete-dialog.component';

export const favouriteLabelRoute: Routes = [
    {
        path: 'favourite-label',
        component: FavouriteLabelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteLabel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'favourite-label/:id',
        component: FavouriteLabelDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteLabel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const favouriteLabelPopupRoute: Routes = [
    {
        path: 'favourite-label-new',
        component: FavouriteLabelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteLabel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'favourite-label/:id/edit',
        component: FavouriteLabelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteLabel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'favourite-label/:id/delete',
        component: FavouriteLabelDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteLabel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
