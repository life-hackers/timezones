import { Client } from 'styletron-engine-atomic'

const style = new Client()

function rearrange(css) {
    const o = {}
    Object.keys(css).forEach(key => {
        const kls = key.split(':')
        const stl = css[key]
        const ob = css[kls[0]] || {}
        const ok = kls.length > 2 ? ('::' + kls[1]) :
            (kls.length > 1 ? ':' + kls[1] : null)
        if (ok) {
            ob[ok] = stl
        }
        o[kls[0]] = ob
    })
    return o
}

export function cssInJs(css) {
    const rc = rearrange(css)
    const o = {}
    Object.keys(rc).forEach(k => {
        o[k] = style.renderStyle(rc[k])
    })
    return o
}
