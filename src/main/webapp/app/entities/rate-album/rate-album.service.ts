import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RateAlbum } from './rate-album.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RateAlbumService {

    private resourceUrl = SERVER_API_URL + 'api/rate-albums';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(rateAlbum: RateAlbum): Observable<RateAlbum> {
        const copy = this.convert(rateAlbum);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(rateAlbum: RateAlbum): Observable<RateAlbum> {
        const copy = this.convert(rateAlbum);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<RateAlbum> {
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
     * Convert a returned JSON object to RateAlbum.
     */
    private convertItemFromServer(json: any): RateAlbum {
        const entity: RateAlbum = Object.assign(new RateAlbum(), json);
        entity.date = this.dateUtils
            .convertDateTimeFromServer(json.date);
        return entity;
    }

    /**
     * Convert a RateAlbum to a JSON which can be sent to the server.
     */
    private convert(rateAlbum: RateAlbum): RateAlbum {
        const copy: RateAlbum = Object.assign({}, rateAlbum);

        copy.date = this.dateUtils.toDate(rateAlbum.date);
        return copy;
    }
}
