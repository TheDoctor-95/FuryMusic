import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PendingComponent } from './pending.component';
import { PendingDetailComponent } from './pending-detail.component';
import { PendingPopupComponent } from './pending-dialog.component';
import { PendingDeletePopupComponent } from './pending-delete-dialog.component';

export const pendingRoute: Routes = [
    {
        path: 'pending',
        component: PendingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.pending.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pending/:id',
        component: PendingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.pending.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pendingPopupRoute: Routes = [
    {
        path: 'pending-new',
        component: PendingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.pending.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pending/:id/edit',
        component: PendingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.pending.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pending/:id/delete',
        component: PendingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.pending.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
