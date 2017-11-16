import { BaseEntity, User } from './../../shared';

export class Collection implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public user?: User,
        public songs?: BaseEntity[],
    ) {
    }
}
