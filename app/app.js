import { Tag } from '../lib'
import css from './app.sass'

import { DateTime } from 'luxon'

export class App extends Tag {
    constructor(tag) {
        super(tag, css)
        tag.zone = Intl.DateTimeFormat().resolvedOptions().timeZone
        tag.timeList = this.timeList()
    }

    timeList() {
        const now = DateTime.local()
        const utc = now.toUTC()
        return [
            { value: now, zone: now.zoneName },
            { value: utc, zone: utc.zoneName }
        ]
    }
}