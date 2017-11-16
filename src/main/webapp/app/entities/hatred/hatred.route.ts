import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { HatredComponent } from './hatred.component';
import { HatredDetailComponent } from './hatred-detail.component';
import { HatredPopupComponent } from './hatred-dialog.component';
import { HatredDeletePopupComponent } from './hatred-delete-dialog.component';

export const hatredRoute: Routes = [
    {
        path: 'hatred',
        component: HatredComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.hatred.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'hatred/:id',
        component: HatredDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.hatred.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hatredPopupRoute: Routes = [
    {
        path: 'hatred-new',
        component: HatredPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.hatred.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'hatred/:id/edit',
        component: HatredPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.hatred.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'hatred/:id/delete',
        component: HatredDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.hatred.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
