import { BaseEntity } from './../../shared';

export class Song implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public duration?: number,
        public albums?: BaseEntity[],
        public favouriteSongs?: BaseEntity[],
        public collections?: BaseEntity[],
    ) {
    }
}
