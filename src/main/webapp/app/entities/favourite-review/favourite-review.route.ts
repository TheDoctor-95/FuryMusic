import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FavouriteReviewComponent } from './favourite-review.component';
import { FavouriteReviewDetailComponent } from './favourite-review-detail.component';
import { FavouriteReviewPopupComponent } from './favourite-review-dialog.component';
import { FavouriteReviewDeletePopupComponent } from './favourite-review-delete-dialog.component';

export const favouriteReviewRoute: Routes = [
    {
        path: 'favourite-review',
        component: FavouriteReviewComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteReview.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'favourite-review/:id',
        component: FavouriteReviewDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteReview.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const favouriteReviewPopupRoute: Routes = [
    {
        path: 'favourite-review-new',
        component: FavouriteReviewPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteReview.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'favourite-review/:id/edit',
        component: FavouriteReviewPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteReview.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'favourite-review/:id/delete',
        component: FavouriteReviewDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteReview.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
