import { BaseEntity, User } from './../../shared';

export class FavouriteReview implements BaseEntity {
    constructor(
        public id?: number,
        public liked?: boolean,
        public date?: any,
        public review?: BaseEntity,
        public user?: User,
    ) {
        this.liked = false;
    }
}
