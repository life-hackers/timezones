import { mount, injectHTML } from '../../test/helper'
import './item-ctrl.pug'

const setZone = () => { }
const toFormat = () => { }

describe('<item-ctrl/>', function() {
    describe('element', function() {
        it('should have', function() {
            injectHTML('<item-ctrl></item-ctrl>')
            const tag = mount('item-ctrl', { at: {setZone, toFormat}, time: {} })
            expect(1).to.eql(1)
        })
    })
})
