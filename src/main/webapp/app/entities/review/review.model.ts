import { BaseEntity } from './../../shared';

export class Review implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public title?: string,
        public review?: string,
        public album?: BaseEntity,
        public favouriteReviews?: BaseEntity[],
    ) {
    }
}
