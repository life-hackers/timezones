import { Tag } from '../../lib'
import css from './time-list.sass'

import { DateTime } from 'luxon'

let at = 'now'

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
        if (act === 'at-changed') {
            at = data
            this.at = at === 'now' ? DateTime.local() : data
            this.update()
        }
    }

    update() {
        this.list = this.opts.list || []
    }

    renewAt(tag) {
        if (at === 'now') {
            tag.at = DateTime.local()
        }
        tag.update()
        setTimeout(() => {
            this.renewAt(tag)
        }, 5000)
    }
}