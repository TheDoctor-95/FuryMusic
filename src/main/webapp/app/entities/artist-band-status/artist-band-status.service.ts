import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ArtistBandStatus } from './artist-band-status.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ArtistBandStatusService {

    private resourceUrl = SERVER_API_URL + 'api/artist-band-statuses';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(artistBandStatus: ArtistBandStatus): Observable<ArtistBandStatus> {
        const copy = this.convert(artistBandStatus);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(artistBandStatus: ArtistBandStatus): Observable<ArtistBandStatus> {
        const copy = this.convert(artistBandStatus);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ArtistBandStatus> {
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
     * Convert a returned JSON object to ArtistBandStatus.
     */
    private convertItemFromServer(json: any): ArtistBandStatus {
        const entity: ArtistBandStatus = Object.assign(new ArtistBandStatus(), json);
        entity.incorporationDate = this.dateUtils
            .convertLocalDateFromServer(json.incorporationDate);
        entity.leavingDate = this.dateUtils
            .convertLocalDateFromServer(json.leavingDate);
        return entity;
    }

    /**
     * Convert a ArtistBandStatus to a JSON which can be sent to the server.
     */
    private convert(artistBandStatus: ArtistBandStatus): ArtistBandStatus {
        const copy: ArtistBandStatus = Object.assign({}, artistBandStatus);
        copy.incorporationDate = this.dateUtils
            .convertLocalDateToServer(artistBandStatus.incorporationDate);
        copy.leavingDate = this.dateUtils
            .convertLocalDateToServer(artistBandStatus.leavingDate);
        return copy;
    }
}
