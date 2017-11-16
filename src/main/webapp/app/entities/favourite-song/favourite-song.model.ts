import { BaseEntity, User } from './../../shared';

export class FavouriteSong implements BaseEntity {
    constructor(
        public id?: number,
        public liked?: boolean,
        public date?: any,
        public song?: BaseEntity,
        public user?: User,
    ) {
        this.liked = false;
    }
}
