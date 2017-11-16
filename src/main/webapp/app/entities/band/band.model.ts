import { BaseEntity } from './../../shared';

export class Band implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public creationDate?: any,
        public active?: boolean,
        public imgContentType?: string,
        public img?: any,
        public country?: BaseEntity,
        public genres?: BaseEntity[],
        public favoriteBands?: BaseEntity[],
        public hatreds?: BaseEntity[],
        public concerts?: BaseEntity[],
        public socials?: BaseEntity[],
        public artistBandStatuses?: BaseEntity[],
    ) {
        this.active = false;
    }
}
