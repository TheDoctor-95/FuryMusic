import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FavouriteReview } from './favourite-review.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FavouriteReviewService {

    private resourceUrl = SERVER_API_URL + 'api/favourite-reviews';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(favouriteReview: FavouriteReview): Observable<FavouriteReview> {
        const copy = this.convert(favouriteReview);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(favouriteReview: FavouriteReview): Observable<FavouriteReview> {
        const copy = this.convert(favouriteReview);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<FavouriteReview> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to FavouriteReview.
     */
    private convertItemFromServer(json: any): FavouriteReview {
        const entity: FavouriteReview = Object.assign(new FavouriteReview(), json);
        entity.date = this.dateUtils
            .convertDateTimeFromServer(json.date);
        return entity;
    }

    /**
     * Convert a FavouriteReview to a JSON which can be sent to the server.
     */
    private convert(favouriteReview: FavouriteReview): FavouriteReview {
        const copy: FavouriteReview = Object.assign({}, favouriteReview);

        copy.date = this.dateUtils.toDate(favouriteReview.date);
        return copy;
    }
}
