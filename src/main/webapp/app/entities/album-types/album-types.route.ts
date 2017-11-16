import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AlbumTypesComponent } from './album-types.component';
import { AlbumTypesDetailComponent } from './album-types-detail.component';
import { AlbumTypesPopupComponent } from './album-types-dialog.component';
import { AlbumTypesDeletePopupComponent } from './album-types-delete-dialog.component';

export const albumTypesRoute: Routes = [
    {
        path: 'album-types',
        component: AlbumTypesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.albumTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'album-types/:id',
        component: AlbumTypesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.albumTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const albumTypesPopupRoute: Routes = [
    {
        path: 'album-types-new',
        component: AlbumTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.albumTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'album-types/:id/edit',
        component: AlbumTypesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.albumTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'album-types/:id/delete',
        component: AlbumTypesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.albumTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
