import { BaseEntity } from './../../shared';

export class Label implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public imgContentType?: string,
        public img?: any,
        public country?: BaseEntity,
        public favouriteLabels?: BaseEntity[],
    ) {
    }
}
