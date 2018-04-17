import { Tag } from '../lib'
import css from './app.sass'

import { WatchList } from './watch-list'

const watchList = new WatchList()

export class App extends Tag {
    constructor(tag) {
        super(tag, css)
        tag.addTimezone = this.addTimezone.bind(tag)
        this.updateTimes(tag)
        setInterval(this.updateTimes.bind(this, tag), 10 * 1000)
    }

    updateTimes(tag) {
        tag.times = watchList.times
        tag.update()
    }

    addTimezone(tz, zone) {
        watchList.add(zone)
        this.times = watchList.times
        this.update()
    }
}
