import { Tag } from '../../lib'
import css from './time-box.sass'

export class TimeBox extends Tag {
    constructor(tag, { time }) {
        console.log('time-box', time)
        super(tag, css)
        this.time = time
        tag.str = {
            date: time.value.toISODate(),
            time: time.value.toFormat('HH:mm:ssZZZ'),
            zone: time.value.toFormat('z')
        }
    }
}