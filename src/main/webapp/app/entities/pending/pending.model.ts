import { BaseEntity, User } from './../../shared';

export class Pending implements BaseEntity {
    constructor(
        public id?: number,
        public pending?: boolean,
        public date?: any,
        public user?: User,
        public album?: BaseEntity,
    ) {
        this.pending = false;
    }
}
