import { BaseEntity } from './../../shared';

export class Concerts implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public place?: string,
        public latitude?: number,
        public longitud?: number,
        public urlGoogle?: string,
        public date?: any,
        public band?: BaseEntity,
        public artist?: BaseEntity,
    ) {
    }
}
