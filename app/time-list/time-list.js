import { Tag } from '../../lib'
import css from './time-list.sass'

import { DateTime } from 'luxon'

export class TimeList extends Tag {
    constructor(tag, opts) {
        super(tag, css)
        tag.list = opts.list || []
        tag.itemEvent = this.itemEvent.bind(tag)
        tag.on('update', this.update.bind(tag))
        this.renewAt(tag)
    }

    itemEvent(act, data) {
        this.opts.onEvent(act, data)
    }

    update() {
        this.list = this.opts.list || []
    }

    renewAt(tag) {
        tag.now = DateTime.local()
        tag.update()
        setTimeout(() => {
            this.renewAt(tag)
        }, 5000)
    }
}