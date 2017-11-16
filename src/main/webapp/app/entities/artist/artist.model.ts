import { BaseEntity } from './../../shared';

export class Artist implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public surname?: string,
        public birthdate?: any,
        public sex?: string,
        public alive?: boolean,
        public deathdate?: any,
        public imgContentType?: string,
        public img?: any,
        public country?: BaseEntity,
        public favouriteArtists?: BaseEntity[],
        public concerts?: BaseEntity[],
        public socials?: BaseEntity[],
        public artistBandStatuses?: BaseEntity[],
    ) {
        this.alive = false;
    }
}
