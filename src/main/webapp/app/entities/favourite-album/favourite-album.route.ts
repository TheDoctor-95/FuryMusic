import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FavouriteAlbumComponent } from './favourite-album.component';
import { FavouriteAlbumDetailComponent } from './favourite-album-detail.component';
import { FavouriteAlbumPopupComponent } from './favourite-album-dialog.component';
import { FavouriteAlbumDeletePopupComponent } from './favourite-album-delete-dialog.component';

export const favouriteAlbumRoute: Routes = [
    {
        path: 'favourite-album',
        component: FavouriteAlbumComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteAlbum.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'favourite-album/:id',
        component: FavouriteAlbumDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteAlbum.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const favouriteAlbumPopupRoute: Routes = [
    {
        path: 'favourite-album-new',
        component: FavouriteAlbumPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteAlbum.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'favourite-album/:id/edit',
        component: FavouriteAlbumPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteAlbum.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'favourite-album/:id/delete',
        component: FavouriteAlbumDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteAlbum.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
