import { BaseEntity, User } from './../../shared';

export class FavouriteAlbum implements BaseEntity {
    constructor(
        public id?: number,
        public liked?: boolean,
        public date?: any,
        public album?: BaseEntity,
        public user?: User,
    ) {
        this.liked = false;
    }
}
