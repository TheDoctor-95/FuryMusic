import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CollectionComponent } from './collection.component';
import { CollectionDetailComponent } from './collection-detail.component';
import { CollectionPopupComponent } from './collection-dialog.component';
import { CollectionDeletePopupComponent } from './collection-delete-dialog.component';

export const collectionRoute: Routes = [
    {
        path: 'collection',
        component: CollectionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.collection.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'collection/:id',
        component: CollectionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.collection.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const collectionPopupRoute: Routes = [
    {
        path: 'collection-new',
        component: CollectionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.collection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'collection/:id/edit',
        component: CollectionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.collection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'collection/:id/delete',
        component: CollectionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.collection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
