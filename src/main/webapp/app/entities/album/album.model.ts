import { BaseEntity } from './../../shared';

export class Album implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public releaseDate?: any,
        public description?: string,
        public imgContentType?: string,
        public img?: any,
        public albumType?: BaseEntity,
        public reviews?: BaseEntity[],
        public favouriteAlbums?: BaseEntity[],
        public rateAlbums?: BaseEntity[],
        public pendings?: BaseEntity[],
        public songs?: BaseEntity[],
    ) {
    }
}
