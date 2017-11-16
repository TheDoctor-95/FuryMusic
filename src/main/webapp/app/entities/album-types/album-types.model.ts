import { BaseEntity } from './../../shared';

export class AlbumTypes implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public albums?: BaseEntity[],
    ) {
    }
}
