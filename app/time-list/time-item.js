import { Tag } from '../../lib'
import css from './time-item.sass'


function updated() {
    const { ctrl } = this.refs
    if (!ctrl) {
        return
    }
    this.refs.ctrl.onx('dismiss', () => {
        this.showCtrl = false
        this.update()
    })
    this.refs.ctrl.onx('remove', (t) => {
        this.opts.onEvent('remove', t)
    })
    this.refs.ctrl.onx('at-changed', (t) => {
        this.opts.onEvent('at-changed', t)
    })
}

export class TimeItem extends Tag {
    constructor(tag, { time }) {
        super(tag, css)
        this.time = time
        tag.removable = this.removable.bind(tag)
        tag.on('updated', updated.bind(tag))
    }

    removable() {
        this.showCtrl = true
    }
}