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

function ensureDefault(list = []) {
    if (list.length > 0) {
        return
    }
    const now = DateTime.local()
    add('Europe/London')
    add(now.zoneName)
}

function listTimes() {
    const now = DateTime.local()
    return list.map(it => ({
        value: now.setZone(it),
        zone: it
    }))
}

export class WatchList {
    constructor() {
        list = Store.get(storeKey) || []
        ensureDefault(list)
    }

    add(zone) {
        add(zone)
    }

    get times() {
        return listTimes()
    }
}
