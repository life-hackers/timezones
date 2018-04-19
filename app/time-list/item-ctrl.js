import { Tag } from '../../lib'
import css from './item-ctrl.sass'

import { DateTime } from 'luxon'

const fmt = {
    date: 'yyyy-MM-dd\'T\'HH:mm'
}
const evts = {}

function con(k) {
    return evts[this._riot_id][k]
}

function on(e, fn) {
    evts[this._riot_id][e] = fn
}

function bmount() {
    let { at, time: { zone } } = this.opts
    at = at.setZone(zone)
    this.at = at
    this.datetime = at.toFormat(fmt.date)
}

function changeDate(e) {
    const { value } = e.target
    const t = DateTime.fromFormat(value, fmt.date)
    this.con('at-changed')(t.isValid ? t : 'now')
}

export class ItemCtrl extends Tag {
    constructor(tag) {
        evts[tag._riot_id] = {}
        super(tag, css)
        tag.onx = on.bind(tag)
        tag.con = con.bind(tag)
        tag.remove = this.remove.bind(tag)
        tag.dismiss = this.dismiss.bind(tag)
        tag.changeDate = changeDate.bind(tag)
        // tag.on('update', update.bind(tag))
        tag.on('before-mount', bmount.bind(tag))
    }

    remove() {
        const { time } = this.opts
        this.con('remove')(time)
    }

    dismiss() {
        this.con('dismiss')()
    }
}