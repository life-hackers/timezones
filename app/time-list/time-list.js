import { Tag } from '../../lib'
import css from './time-list.sass'

export class TimeList extends Tag {
    constructor(tag, opts) {
        super(tag, css)
        tag.list = opts.list || []
    }
}