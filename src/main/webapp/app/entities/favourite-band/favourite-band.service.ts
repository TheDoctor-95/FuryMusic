import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FavouriteBand } from './favourite-band.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FavouriteBandService {

    private resourceUrl = SERVER_API_URL + 'api/favourite-bands';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(favouriteBand: FavouriteBand): Observable<FavouriteBand> {
        const copy = this.convert(favouriteBand);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(favouriteBand: FavouriteBand): Observable<FavouriteBand> {
        const copy = this.convert(favouriteBand);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<FavouriteBand> {
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
     * Convert a returned JSON object to FavouriteBand.
     */
    private convertItemFromServer(json: any): FavouriteBand {
        const entity: FavouriteBand = Object.assign(new FavouriteBand(), json);
        entity.date = this.dateUtils
            .convertDateTimeFromServer(json.date);
        return entity;
    }

    /**
     * Convert a FavouriteBand to a JSON which can be sent to the server.
     */
    private convert(favouriteBand: FavouriteBand): FavouriteBand {
        const copy: FavouriteBand = Object.assign({}, favouriteBand);

        copy.date = this.dateUtils.toDate(favouriteBand.date);
        return copy;
    }
}
