import Riot from 'riot'
export const riot = Riot

export function mount(tag, opts = {}) {
    const [rtag] = riot.mount('body', tag, opts)
    return rtag
}

export function injectHTML(html) {
    var div = document.createElement('div')
    div.innerHTML = html instanceof Array ? html.join('\n') : html
    // while (div.firstChild) {
    document.body.appendChild(div.firstChild)
    // }
}
