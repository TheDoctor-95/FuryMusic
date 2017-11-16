import { BaseEntity, User } from './../../shared';

export class FavouriteLabel implements BaseEntity {
    constructor(
        public id?: number,
        public liked?: boolean,
        public date?: any,
        public label?: BaseEntity,
        public user?: User,
    ) {
        this.liked = false;
    }
}
