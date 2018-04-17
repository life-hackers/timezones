import { Tag } from '../../lib'
import css from './list.sass'

export class List extends Tag {
    constructor(tag, { list }) {
        super(tag, css)
        tag.list = list || []
        tag.chopUtc = this.chopUtc.bind(tag)
        tag.itemClick = this.click.bind(tag)
        tag.on('update', this.update.bind(tag))
    }

    click(tz, zone) {
        return () => {
            this.opts.onSelect(tz, zone)
        }
    }

    chopUtc(str) {
        return str.split(') ')[1]
    }

    update() {
        this.list = this.opts.list
    }
}
