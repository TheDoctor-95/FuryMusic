import { BaseEntity } from './../../shared';

export class ArtistBandStatus implements BaseEntity {
    constructor(
        public id?: number,
        public incorporationDate?: any,
        public leavingDate?: any,
        public artist?: BaseEntity,
        public band?: BaseEntity,
    ) {
    }
}
