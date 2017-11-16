import { BaseEntity, User } from './../../shared';

export class UserExt implements BaseEntity {
    constructor(
        public id?: number,
        public imageContentType?: string,
        public image?: any,
        public locationGoogleMaps?: string,
        public user?: User,
        public country?: BaseEntity,
    ) {
    }
}
