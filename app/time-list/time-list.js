import { Tag } from '../../lib'

export class TimeList extends Tag {
    constructor(tag, opts) {
        super(tag)
        tag.list = opts.list || []
    }
}