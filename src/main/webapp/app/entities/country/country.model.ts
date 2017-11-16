import { BaseEntity } from './../../shared';

export class Country implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public urlGoogleMaps?: string,
        public userExts?: BaseEntity[],
        public artists?: BaseEntity[],
        public bands?: BaseEntity[],
        public labels?: BaseEntity[],
    ) {
    }
}
