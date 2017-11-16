import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FavouriteLabel } from './favourite-label.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FavouriteLabelService {

    private resourceUrl = SERVER_API_URL + 'api/favourite-labels';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(favouriteLabel: FavouriteLabel): Observable<FavouriteLabel> {
        const copy = this.convert(favouriteLabel);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(favouriteLabel: FavouriteLabel): Observable<FavouriteLabel> {
        const copy = this.convert(favouriteLabel);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<FavouriteLabel> {
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
     * Convert a returned JSON object to FavouriteLabel.
     */
    private convertItemFromServer(json: any): FavouriteLabel {
        const entity: FavouriteLabel = Object.assign(new FavouriteLabel(), json);
        entity.date = this.dateUtils
            .convertDateTimeFromServer(json.date);
        return entity;
    }

    /**
     * Convert a FavouriteLabel to a JSON which can be sent to the server.
     */
    private convert(favouriteLabel: FavouriteLabel): FavouriteLabel {
        const copy: FavouriteLabel = Object.assign({}, favouriteLabel);

        copy.date = this.dateUtils.toDate(favouriteLabel.date);
        return copy;
    }
}
