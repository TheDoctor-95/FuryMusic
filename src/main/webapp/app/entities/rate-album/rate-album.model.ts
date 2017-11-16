import { BaseEntity, User } from './../../shared';

export class RateAlbum implements BaseEntity {
    constructor(
        public id?: number,
        public rate?: number,
        public date?: any,
        public album?: BaseEntity,
        public user?: User,
    ) {
    }
}
