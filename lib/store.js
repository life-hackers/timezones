const store = localStorage

export class Store {
    static set(k, v) {
        return store.setItem(k, JSON.stringify(v))
    }

    static get(k) {
        return JSON.parse(store.getItem(k) || 'null')
    }
}