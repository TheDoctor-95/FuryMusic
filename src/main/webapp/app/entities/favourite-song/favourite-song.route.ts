import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FavouriteSongComponent } from './favourite-song.component';
import { FavouriteSongDetailComponent } from './favourite-song-detail.component';
import { FavouriteSongPopupComponent } from './favourite-song-dialog.component';
import { FavouriteSongDeletePopupComponent } from './favourite-song-delete-dialog.component';

export const favouriteSongRoute: Routes = [
    {
        path: 'favourite-song',
        component: FavouriteSongComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteSong.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'favourite-song/:id',
        component: FavouriteSongDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteSong.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const favouriteSongPopupRoute: Routes = [
    {
        path: 'favourite-song-new',
        component: FavouriteSongPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteSong.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'favourite-song/:id/edit',
        component: FavouriteSongPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteSong.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'favourite-song/:id/delete',
        component: FavouriteSongDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.favouriteSong.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
