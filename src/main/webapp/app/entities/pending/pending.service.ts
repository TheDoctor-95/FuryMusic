import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Pending } from './pending.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PendingService {

    private resourceUrl = SERVER_API_URL + 'api/pendings';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(pending: Pending): Observable<Pending> {
        const copy = this.convert(pending);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(pending: Pending): Observable<Pending> {
        const copy = this.convert(pending);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Pending> {
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
     * Convert a returned JSON object to Pending.
     */
    private convertItemFromServer(json: any): Pending {
        const entity: Pending = Object.assign(new Pending(), json);
        entity.date = this.dateUtils
            .convertDateTimeFromServer(json.date);
        return entity;
    }

    /**
     * Convert a Pending to a JSON which can be sent to the server.
     */
    private convert(pending: Pending): Pending {
        const copy: Pending = Object.assign({}, pending);

        copy.date = this.dateUtils.toDate(pending.date);
        return copy;
    }
}
