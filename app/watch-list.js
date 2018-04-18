import { DateTime } from 'luxon'
import { Store } from '../lib'

const storeKey = 'watch-list'
let list = []

function add(item) {
    const it = list.find(i => i && (i === item))
    if (!it) {
        list.push(item)
        Store.set(storeKey, list)
    }
}

function remove(item) {
    const inx = list.indexOf(item)
    if (inx >= 0) {
        list.splice(inx, 1)
        Store.set(storeKey, list)
    }
}

function ensureDefault(list = []) {
    if (list.length > 0) {
        return
    }
    const now = DateTime.local()
    add('Europe/London')
    add(now.zoneName)
}

export class WatchList {
    constructor() {
        list = Store.get(storeKey) || []
        ensureDefault(list)
        this.times = list.map(zone => ({ zone }))
    }

    add(zone) {
        add(zone)
        this.times.push({ zone })
    }

    remove(t) {
        remove(t.zone)
        const i = this.times.indexOf(t)
        i >= 0 ? this.times.splice(i, 1) : null
    }
}
