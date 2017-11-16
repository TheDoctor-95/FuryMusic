import { BaseEntity, User } from './../../shared';

export class FavouriteBand implements BaseEntity {
    constructor(
        public id?: number,
        public liked?: boolean,
        public date?: any,
        public band?: BaseEntity,
        public user?: User,
    ) {
        this.liked = false;
    }
}
