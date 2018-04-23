import Riot from 'riot'
export const riot = Riot

export function mount(tag) {
    const [rtag] = riot.mount(tag)
    return rtag
}

export function injectHTML(html) {
    var div = document.createElement('div')
    div.innerHTML = html instanceof Array ? html.join('\n') : html
    // while (div.firstChild) {
    document.body.appendChild(div.firstChild)
    // }
}
