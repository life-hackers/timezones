import { Tag } from '../lib'
import css from './app.sass'

import { WatchList } from './watch-list'

const watchList = new WatchList()

export class App extends Tag {
    constructor(tag) {
        super(tag, css)
        tag.addTimezone = this.addTimezone.bind(tag)
        tag.listEvent = this.listEventHandler.bind(tag)
        this.updateTimes(tag)
    }

    listEventHandler(act, data) {
        if (act === 'remove') {
            watchList.remove(data)
            this.update()
        }
    }

    updateTimes(tag) {
        tag.times = watchList.times
        tag.update()
    }

    addTimezone(tz, zone) {
        watchList.add(zone)
        this.update()
    }
}
