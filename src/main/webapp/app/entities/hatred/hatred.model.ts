import { BaseEntity, User } from './../../shared';

export class Hatred implements BaseEntity {
    constructor(
        public id?: number,
        public hated?: boolean,
        public date?: any,
        public user?: User,
        public band?: BaseEntity,
    ) {
        this.hated = false;
    }
}
