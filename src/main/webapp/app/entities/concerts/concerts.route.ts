import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ConcertsComponent } from './concerts.component';
import { ConcertsDetailComponent } from './concerts-detail.component';
import { ConcertsPopupComponent } from './concerts-dialog.component';
import { ConcertsDeletePopupComponent } from './concerts-delete-dialog.component';

export const concertsRoute: Routes = [
    {
        path: 'concerts',
        component: ConcertsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.concerts.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'concerts/:id',
        component: ConcertsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.concerts.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const concertsPopupRoute: Routes = [
    {
        path: 'concerts-new',
        component: ConcertsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.concerts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'concerts/:id/edit',
        component: ConcertsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.concerts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'concerts/:id/delete',
        component: ConcertsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'furyMusicApp.concerts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
