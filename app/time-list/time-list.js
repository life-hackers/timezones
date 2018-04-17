import { Tag } from '../../lib'
import css from './time-list.sass'

export class TimeList extends Tag {
    constructor(tag, opts) {
        super(tag, css)
        tag.list = opts.list || []
        tag.on('update', this.update.bind(tag))
    }

    update() {
        this.list = this.opts.list || []
    }
}