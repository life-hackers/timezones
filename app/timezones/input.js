import { Tag, Store } from '../../lib'
import css from './input.sass'

import Fuse from 'fuse.js'
import { fuseOpts } from './fuse-opts'

export class Input extends Tag {
    constructor(tag) {
        super(tag, css)
        this.loadTimezones(tag)
        tag.onKeyup = this.onKeyup.bind(tag)
        tag.onSelect = this.reset.bind(tag)
        tag.on('update', this.update.bind(tag))
    }

    reset(...args) {
        const { onSelect } = this.opts
        if (typeof onSelect === 'function') {
            onSelect(...args)
        }
        this.search = null
        this.update()
    }

    update() {
        if (!this.search) {
            return
        }
        this.ftzs = this.fuz.search(this.search).slice(0, 10)
    }

    onKeyup(e) {
        this.search = e.target.value
        this.update()
    }

    loadTimezones(tag) {
        this.localTimezones()
            .catch(() => {
                return this.fetchTimezones().then(tzs => {
                    Store.set('timezones', tzs)
                    return tzs
                })
            })
            .then(tzs => {
                tag.tzs = tzs
                tag.fuz = new Fuse(tzs, fuseOpts)
            })
    }

    localTimezones() {
        return new Promise((ok, rej) => {
            const tzs = Store.get('timezones')
            tzs ? ok(tzs) : rej([])
        })
    }

    fetchTimezones() {
        const url =
            'https://raw.githubusercontent.com/speed-of-light/timezones.json/master/timezones.json'
        return fetch(url).then(rsp => {
            return rsp.json()
        })
    }
}
