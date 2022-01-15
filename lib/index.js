import p5 from 'p5'
import Clickable from './Clickable'
import { message, warning } from './console/friendly'
import preHook from './hooks/preHook'
import postHook from './hooks/postHook'

message(`initializing`)

if (!window.hasOwnProperty('p5')) {
    warning(`p5.js wasn't found`)
}

try {
    p5.prototype.__clickable__ = {
        cursorStyle: 'default',
        clickables: [],
        mouseWasPressed: false,
        lastHovered: null,
        lastClicked: null,
    }

    p5.prototype.Clickable = function (...args) {
        let element = new Clickable({
            ...args,
            p5instance: this,
        })

        console.log('this', this)

        this.__clickable__.clickables.push(element)

        return element
    }

    p5.prototype.registerMethod('pre', preHook)

    p5.prototype.registerMethod('post', postHook)
} catch (err) {
    warning(`the following error occured when trying to initialize clickable`)
    console.error(err)
}

export {}
