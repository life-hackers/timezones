import { injectHTML } from '../test/helper'
import './app.pug'

describe('<app></app>', function() {
    describe('dom', function() {
        it('should render properly', function() {
            injectHTML('<app></app>')
            let [tag] = riot.mount('app')
            expect(tag.opts).to.eql({})
        })
    })
})
