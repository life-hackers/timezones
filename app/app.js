export class App {
    constructor(tag) {
        tag.zone = Intl.DateTimeFormat().resolvedOptions().timeZone
        this.updateNow(tag)
        setInterval(() => {
            this.updateNow(tag)
        }, 10 * 1000)
    }

    updateNow(tag) {
        tag.now = (new Date()).getTime()
        tag.update()
    }
}