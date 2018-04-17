import { cssInJs } from '../lib/style'

export class Tag {
    constructor(tag, css = {}) {
        this.tag = tag
        tag.css = cssInJs(tag.css || css)
    }
}