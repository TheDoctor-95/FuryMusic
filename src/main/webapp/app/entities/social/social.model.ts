import { BaseEntity, User } from './../../shared';

export class Social implements BaseEntity {
    constructor(
        public id?: number,
        public url?: string,
        public artist?: BaseEntity,
        public band?: BaseEntity,
        public user?: User,
    ) {
    }
}
