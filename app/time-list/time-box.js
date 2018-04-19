import { Tag } from '../../lib'
import css from './time-box.sass'

export class TimeBox extends Tag {
    constructor(tag, { time }) {
        super(tag, css)
        this.time = time
        tag.removable = this.removable.bind(tag)
        tag.remove = this.remove.bind(tag)
        tag.cancel = this.cancel.bind(tag)
        this.update.bind(tag)()
        tag.on('update', this.update.bind(tag))
    }

    update() {
        const t = this.opts.time
        const v = this.opts.at.setZone(t.zone)
        this.str = {
            date: v.toISODate(),
            time: v.toFormat('HH:mm:ss'),
            z: v.toFormat('ZZZ'),
            zone: v.toFormat('z')
        }
    }

    removable() {
        this.removing = true
    }

    remove() {
        const { time } = this.opts
        this.opts.onEvent('remove', time)
    }

    cancel() {
        this.removing = false
    }
}