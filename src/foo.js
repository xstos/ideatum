import {html, render} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import {setCursorToEnd} from "./util.js";

var ignorePos = false
const foo = {
    cursor: {
        ctor(o) {
            //o.attachShadow({mode: 'open'});
        },
        mount(o) {
            var h = html`<div id="cursorInput"
                              tabindex="-1"
                     style="display: inline-block;
                             caret-shape: block;
                             min-width: 1ch;
                             padding-left: 0px;
                             border: 1px solid white;"
                     contenteditable="plaintext-only"></div>`;
            function _render() {
                render(h,o)
                setCursorToEnd(cursorInput)
            }
            o.render=_render
            console.log("cursor mounted")
        },
        unmount(o) {

        }
    }

}

function on(typeString, evt, o) {
    foo[typeString][evt](o);
}

class X extends HTMLElement {
    constructor() {
        super();
        this.t = this.getAttribute("t")
        on(this.t, "ctor", this)
    }

    connectedCallback() {
        on(this.t, "mount", this)
    }

    disconnectedCallback() {
        on(this.t, "unmount", this)
    }
}

customElements.define('x-', X);

export function dummy() {}