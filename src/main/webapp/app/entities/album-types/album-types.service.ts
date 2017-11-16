import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { AlbumTypes } from './album-types.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AlbumTypesService {

    private resourceUrl = SERVER_API_URL + 'api/album-types';

    constructor(private http: Http) { }

    create(albumTypes: AlbumTypes): Observable<AlbumTypes> {
        const copy = this.convert(albumTypes);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(albumTypes: AlbumTypes): Observable<AlbumTypes> {
        const copy = this.convert(albumTypes);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<AlbumTypes> {
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
     * Convert a returned JSON object to AlbumTypes.
     */
    private convertItemFromServer(json: any): AlbumTypes {
        const entity: AlbumTypes = Object.assign(new AlbumTypes(), json);
        return entity;
    }

    /**
     * Convert a AlbumTypes to a JSON which can be sent to the server.
     */
    private convert(albumTypes: AlbumTypes): AlbumTypes {
        const copy: AlbumTypes = Object.assign({}, albumTypes);
        return copy;
    }
}
