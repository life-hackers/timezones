import { Tag } from '../../lib'
import css from './item-view.sass'

export class ItemView extends Tag {
    constructor(tag) {
        super(tag, css)
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
}