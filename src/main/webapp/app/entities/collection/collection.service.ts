import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Collection } from './collection.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CollectionService {

    private resourceUrl = SERVER_API_URL + 'api/collections';

    constructor(private http: Http) { }

    create(collection: Collection): Observable<Collection> {
        const copy = this.convert(collection);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(collection: Collection): Observable<Collection> {
        const copy = this.convert(collection);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Collection> {
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
     * Convert a returned JSON object to Collection.
     */
    private convertItemFromServer(json: any): Collection {
        const entity: Collection = Object.assign(new Collection(), json);
        return entity;
    }

    /**
     * Convert a Collection to a JSON which can be sent to the server.
     */
    private convert(collection: Collection): Collection {
        const copy: Collection = Object.assign({}, collection);
        return copy;
    }
}
